import React, { useMemo, useRef, useState, useCallback } from 'react' // Added useEffect
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  LayoutRectangle,
} from 'react-native'
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native'
import { RootStackParamList } from '../../interface/navigation' // Added import
import { useAppReducer } from '../../hook'
import generateCharacter from '../../utils/generateCharacter'
import { Character } from '../../interface/Character'
import {
  CoreCharacteristicKey,
  CoreCharacteristicEnum,
} from '../../constant/enums' // Removed CheckObjectKey, Added CoreCharacteristicEnum
import { typeface } from '../../theme/typeface'
import palette from '../../theme/palette'
import DraggableListItem from '../components/DraggableListItem'
import { useAttributeAllocator } from '../../hooks/useAttributeAllocator'

type AttributeAllocationScreenRouteProp = RouteProp<
  RootStackParamList,
  'AttributeAllocationScreen'
>

const VALUE_ITEM_HEIGHT = 50
const ATTRIBUTE_SLOT_HEIGHT = 60

const AttributeAllocationScreen: React.FC = () => {
  const [, dispatch] = useAppReducer()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute<AttributeAllocationScreenRouteProp>()

  const {
    onCompleteNavigateToSceneId,
    attributeValuesToAssign = [40, 50, 50, 50, 60, 60, 70, 80],
  } = route.params

  // Memoize characteristicKeys as it's a dependency for the hook
  const characteristicKeys = useMemo(
    (): CoreCharacteristicKey[] => [
      CoreCharacteristicEnum.STR,
      CoreCharacteristicEnum.CON,
      CoreCharacteristicEnum.DEX,
      CoreCharacteristicEnum.APP,
      CoreCharacteristicEnum.POW,
      CoreCharacteristicEnum.SIZ,
      CoreCharacteristicEnum.INT,
      CoreCharacteristicEnum.EDU,
    ],
    [],
  )

  const {
    availableValues,
    allocatedAttributes,
    handleDrop,
    handleUnassign,
    isAllocationComplete,
  } = useAttributeAllocator({
    attributeValuesToAssign,
    characteristicKeys,
  })

  const [hoveredDropTargetKey, setHoveredDropTargetKey] = useState<
    CoreCharacteristicKey | 'available' | null
  >(null)

  // State for absolute layout data
  const [absAttributeSlotsLayout, setAbsAttributeSlotsLayout] = useState<Record<
    CoreCharacteristicKey,
    LayoutRectangle | null
  > | null>(null)
  const [absAvailableValuesZoneLayout, setAbsAvailableValuesZoneLayout] =
    useState<LayoutRectangle | null>(null)

  // Refs for view elements to measure
  const availableValuesContainerRef = useRef<View>(null)
  const attributeSlotViewRefs = useRef<Record<string, View | null>>({})

  const measureLayout = useCallback(() => {
    // Measure available values zone
    if (availableValuesContainerRef.current) {
      availableValuesContainerRef.current.measureInWindow(
        (x, y, width, height) => {
          console.log('Measured available values zone:', {
            x,
            y,
            width,
            height,
          })
          if (!isNaN(x) && !isNaN(y)) {
            setAbsAvailableValuesZoneLayout({ x, y, width, height })
          }
        },
      )
    }

    // Measure attribute slots
    // Use Promise.all to set the state once all measurements are attempted
    const layoutPromises = characteristicKeys.map(key => {
      return new Promise<{
        key: CoreCharacteristicKey
        layout: LayoutRectangle | null
      }>(resolve => {
        const slotView = attributeSlotViewRefs.current[key]
        if (slotView) {
          slotView.measureInWindow((x, y, width, height) => {
            console.log(`Measured ${key}:`, { x, y, width, height })
            resolve({
              key,
              layout: !isNaN(x) && !isNaN(y) ? { x, y, width, height } : null,
            })
          })
        } else {
          resolve({ key, layout: null })
        }
      })
    })

    Promise.all(layoutPromises)
      .then(results => {
        const newLayouts = results.reduce(
          (acc, current) => {
            acc[current.key] = current.layout
            return acc
          },
          {} as Record<CoreCharacteristicKey, LayoutRectangle | null>,
        )
        setAbsAttributeSlotsLayout(newLayouts)
      })
      .catch(() => {
        // Handle potential errors from Promise.all if any promise rejects
        const nullLayouts = characteristicKeys.reduce(
          (acc, currentKey) => {
            acc[currentKey] = null
            return acc
          },
          {} as Record<CoreCharacteristicKey, LayoutRectangle | null>,
        )
        setAbsAttributeSlotsLayout(nullLayouts)
      })
  }, [characteristicKeys])

  useFocusEffect(
    React.useCallback(() => {
      const timeout = setTimeout(() => {
        measureLayout()
      }, 1000) // Delay to ensure layout is ready
      return () => clearTimeout(timeout)
    }, [measureLayout]),
  )

  const handleConfirm = () => {
    if (!isAllocationComplete) {
      Alert.alert('提示', '请分配所有属性点！')
      return
    }

    const finalCharacteristics: Character['characteristics'] =
      {} as Character['characteristics']
    let allKeysPresent = true
    for (const key of characteristicKeys) {
      const allocatedItem = allocatedAttributes[key]
      if (!allocatedItem) {
        allKeysPresent = false
        break
      }
      finalCharacteristics[key] = allocatedItem.value
    }

    if (!allKeysPresent) {
      Alert.alert('错误', '内部错误：并非所有属性都已分配值。')
      return
    }
    const emptyCharacter = generateCharacter(finalCharacteristics)
    dispatch({ type: 'STORE_CHARACTER', payload: emptyCharacter })
    dispatch({ type: 'CHANGE_SCENE', payload: onCompleteNavigateToSceneId })
    navigation.navigate('SceneScreen', {})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>分配调查员属性</Text>
      <Text style={styles.instructions}>
        将数值拖拽到对应的属性上进行分配或交换。
      </Text>

      <View
        ref={availableValuesContainerRef} // Added ref
        style={[
          styles.availableValuesContainer,
          hoveredDropTargetKey === 'available' && styles.dropTargetHovered,
        ]}
        // onLayout is no longer the primary source for this ref's data
      >
        <Text style={styles.subHeader}>待分配数值:</Text>
        <View style={styles.valueList}>
          {availableValues.map(item => (
            <DraggableListItem
              key={item.id}
              item={item}
              originKey="available"
              characteristicKeys={characteristicKeys}
              attributeSlotsLayoutData={absAttributeSlotsLayout}
              availableValuesZoneLayoutData={absAvailableValuesZoneLayout}
              onDrop={handleDrop}
              itemHeight={VALUE_ITEM_HEIGHT}
              onHover={setHoveredDropTargetKey}
            />
          ))}
        </View>
      </View>

      <View style={styles.attributesContainer}>
        <Text style={styles.subHeader}>属性:</Text>
        <View style={styles.valueList}>
          {characteristicKeys.map(charKey => {
            const allocatedItem = allocatedAttributes[charKey]
            return (
              <View
                key={charKey}
                style={styles.attributeSlotWrapper}
                // onLayout on wrapper is no longer primary source for attributeSlotsLayout
              >
                <Text style={styles.attributeLabel}>
                  {charKey.toUpperCase()}:
                </Text>
                <View
                  ref={el => {
                    attributeSlotViewRefs.current[charKey] = el
                  }} // Corrected callback ref
                  style={[
                    styles.attributeSlot,
                    hoveredDropTargetKey === charKey &&
                      styles.dropTargetHovered,
                  ]}
                >
                  {allocatedItem ? (
                    <TouchableOpacity onPress={() => handleUnassign(charKey)}>
                      <DraggableListItem
                        key={allocatedItem.id}
                        item={allocatedItem}
                        originKey={charKey}
                        characteristicKeys={characteristicKeys}
                        attributeSlotsLayoutData={absAttributeSlotsLayout}
                        availableValuesZoneLayoutData={
                          absAvailableValuesZoneLayout
                        }
                        onDrop={handleDrop}
                        itemHeight={VALUE_ITEM_HEIGHT}
                        onHover={setHoveredDropTargetKey}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.emptySlotText}>空</Text>
                  )}
                </View>
              </View>
            )
          })}
        </View>
      </View>

      <Button
        title="确认分配"
        onPress={handleConfirm}
        disabled={!isAllocationComplete}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: palette.Background,
  },
  title: {
    fontSize: typeface.Size.Extra,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    color: typeface.Color.Content,
  },
  instructions: {
    fontSize: typeface.Size.Normal,
    textAlign: 'center',
    marginBottom: 15,
  },
  availableValuesContainer: {
    width: '100%',
    height: 150, // Fixed height to accommodate ~2 rows + header + padding
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: palette.Gallery,
    borderRadius: 5,
    alignItems: 'center',
  },
  valueList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  attributesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: typeface.Size.XLarge,
    fontWeight: typeface.Weight.Bold,
    marginBottom: 10,
    textAlign: 'center',
    color: typeface.Color.Content,
  },
  attributeSlotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '50%',
  },
  attributeLabel: {
    fontSize: typeface.Size.Large,
    fontWeight: typeface.Weight.Medium,
    marginRight: 10,
    color: typeface.Color.Content,
  },
  attributeSlot: {
    height: ATTRIBUTE_SLOT_HEIGHT,
    width: 80,
    borderWidth: 1,
    borderColor: palette.Grey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  emptySlotText: {
    color: typeface.Color.Inactive,
    fontStyle: 'italic',
  },
  valueItem: {
    height: VALUE_ITEM_HEIGHT - 10,
    minWidth: 40,
    paddingHorizontal: 10,
    margin: 4,
    borderWidth: 1,
    borderColor: palette.Grey,
    borderRadius: 4,
    backgroundColor: palette.Gallery,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: palette.Black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  valueText: {
    fontSize: typeface.Size.Large,
    fontWeight: 'bold',
  },
  dropTargetHovered: {
    backgroundColor: palette.LightCyan, // Light cyan
    borderColor: palette.LightBlue, // Blue
    borderWidth: 1.5, // Slightly thicker border when hovered
  },
})

export default AttributeAllocationScreen
