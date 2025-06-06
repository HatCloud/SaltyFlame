import React, { useMemo, useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  LayoutRectangle,
  SafeAreaView, // Added SafeAreaView
  Pressable, // Added Pressable for the new button
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
  CheckObjectNames,
} from '../../constant/enums' // Removed CheckObjectKey, Added CoreCharacteristicEnum
import { typeface } from '../../theme/typeface'
import palette from '../../theme/palette'
import { padding } from '../../theme/padding' // Correctly import padding
import DraggableListItem, {
  DraggableValue,
} from '../components/DraggableListItem' // Added DraggableValue import
import { useAttributeAllocator } from '../../hooks/useAttributeAllocator'
import { useI18n } from '../../i18n/useI18n' // Added useI18n import

type AttributeAllocationScreenRouteProp = RouteProp<
  RootStackParamList,
  'AttributeAllocationScreen'
>

const VALUE_ITEM_HEIGHT = 50
const ATTRIBUTE_SLOT_HEIGHT = 60

const AttributeAllocationScreen: React.FC = () => {
  const { t, lang } = useI18n() // Initialize useI18n
  const [, dispatch] = useAppReducer()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute<AttributeAllocationScreenRouteProp>()
  // Removed incorrect useTheme call: const { padding } = ใช้Theme()

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

  // Custom handler to clear hover state after drop
  const customOnDropHandler = (
    draggedItem: DraggableValue,
    originKey: CoreCharacteristicKey | 'available',
    targetKey: CoreCharacteristicKey | 'available',
  ) => {
    handleDrop(draggedItem, originKey, targetKey)
    setHoveredDropTargetKey(null)
  }

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
      Alert.alert(
        t('attributeAllocation.alertTitleHint'),
        t('attributeAllocation.alertMessageAllPoints'),
      )
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
      Alert.alert(
        t('attributeAllocation.alertTitleError'),
        t('attributeAllocation.alertMessageInternalError'),
      )
      return
    }
    const emptyCharacter = generateCharacter(finalCharacteristics)
    dispatch({ type: 'STORE_CHARACTER', payload: emptyCharacter })
    dispatch({ type: 'CHANGE_SCENE', payload: onCompleteNavigateToSceneId })
    navigation.navigate('SceneScreen', {})
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('attributeAllocation.title')}</Text>

        <View style={styles.attributesContainer}>
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
                    {CheckObjectNames[charKey][lang].toUpperCase()}
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
                          onDrop={customOnDropHandler}
                          itemHeight={VALUE_ITEM_HEIGHT}
                          onHover={setHoveredDropTargetKey}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.emptySlotText}>
                        {t('attributeAllocation.emptySlot')}
                      </Text>
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        <Text style={styles.subHeader}>
          {t('attributeAllocation.instructions')}
        </Text>

        <View
          ref={availableValuesContainerRef} // Added ref
          style={styles.availableValuesContainer}
          // onLayout is no longer the primary source for this ref's data
        >
          <View style={styles.valueList}>
            {availableValues.map(item => (
              <DraggableListItem
                key={item.id}
                item={item}
                originKey="available"
                characteristicKeys={characteristicKeys}
                attributeSlotsLayoutData={absAttributeSlotsLayout}
                availableValuesZoneLayoutData={absAvailableValuesZoneLayout}
                onDrop={customOnDropHandler}
                itemHeight={VALUE_ITEM_HEIGHT}
                onHover={setHoveredDropTargetKey}
              />
            ))}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.confirmButton,
            !isAllocationComplete && styles.confirmButtonDisabled,
            pressed && isAllocationComplete && styles.confirmButtonPressed,
          ]}
          onPress={handleConfirm}
          disabled={!isAllocationComplete}
        >
          <Text
            style={[
              styles.confirmButtonText,
              !isAllocationComplete && styles.confirmButtonTextDisabled,
            ]}
          >
            {t('attributeAllocation.confirmAllocation')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.Background,
  },
  container: {
    flex: 1,
    padding: padding.Normal, // Use theme padding
    alignItems: 'center',
  },
  title: {
    fontSize: typeface.Size.Extra,
    fontWeight: typeface.Weight.Bold, // Use theme weight
    // marginTop: 30, // Removed, SafeAreaView handles top spacing
    marginBottom: padding.Normal, // Use theme padding
    color: typeface.Color.Content,
  },
  availableValuesContainer: {
    alignSelf: 'stretch',
    marginHorizontal: padding.ScreenLR,
    borderRadius: padding.Mini,
    paddingHorizontal: padding.Large,
    paddingVertical: padding.Large,
    marginBottom: padding.Large,
    padding: padding.Small,
    alignItems: 'center',
    height: 180,
    backgroundColor: palette.BackgroundGrey,
  },
  valueList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  attributesContainer: {
    alignSelf: 'stretch',
    marginHorizontal: padding.ScreenLR,
    marginTop: padding.Extra,
    marginBottom: padding.Extra, // Use theme padding
  },
  subHeader: {
    fontSize: typeface.Size.Extra,
    fontWeight: typeface.Weight.Bold,
    marginBottom: padding.Normal, // Use theme padding
    textAlign: 'center',
    color: typeface.Color.Content,
  },
  attributeSlotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: padding.Mini, // Use theme padding
    paddingHorizontal: padding.Small, // Use theme padding
    width: '50%', // Keep as is or adjust based on overall layout
  },
  attributeLabel: {
    fontSize: typeface.Size.Extra,
    fontWeight: typeface.Weight.Medium,
    marginRight: padding.Small, // Use theme padding
    color: typeface.Color.Content,
  },
  attributeSlot: {
    height: ATTRIBUTE_SLOT_HEIGHT,
    width: 80, // Keep as is or make responsive
    borderRadius: padding.Mini, // Use theme padding
    justifyContent: 'center',
    alignItems: 'center',
    padding: padding.Mini, // Use theme padding
  },
  emptySlotText: {
    color: typeface.Color.Inactive,
    fontStyle: 'italic',
  },
  // valueItem styles are part of DraggableListItem, not directly here
  // valueText styles are part of DraggableListItem, not directly here
  dropTargetHovered: {
    backgroundColor: palette.LightCyan,
    borderColor: palette.LightBlue,
    borderWidth: 1.5,
  },
  confirmButton: {
    // 宽度在满足margin的请夸下尽可能的大
    alignSelf: 'stretch',
    marginHorizontal: padding.ScreenLR,
    marginTop: padding.Normal,
    paddingVertical: padding.Small,
    paddingHorizontal: padding.Large, // Make button wider
    backgroundColor: palette.LightYellow,
    alignItems: 'center',
    justifyContent: 'center', // Center text
    shadowColor: palette.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: padding.Mini,
    height: 50,
  },
  confirmButtonDisabled: {
    backgroundColor: palette.DarkGrey,
  },
  confirmButtonPressed: {
    backgroundColor: palette.DarkYellow,
    opacity: 0.9,
  },
  confirmButtonText: {
    fontSize: typeface.Size.Extra, // Larger text for confirm button
    color: typeface.Color.ContentDark,
    fontWeight: typeface.Weight.Bold,
  },
  confirmButtonTextDisabled: {
    color: typeface.Color.Inactive,
  },
})

export default AttributeAllocationScreen
