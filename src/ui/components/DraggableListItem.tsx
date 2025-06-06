import React, { useRef } from 'react' // Added useRef
import { Text, StyleSheet, LayoutRectangle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler' // Updated import
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { CoreCharacteristicKey } from '../../constant/enums'
import { typeface } from '../../theme/typeface'

export interface DraggableValue {
  id: string
  value: number
}

interface DraggableListItemProps {
  item: DraggableValue
  originKey: CoreCharacteristicKey | 'available'
  characteristicKeys: CoreCharacteristicKey[]
  // Changed from refs to direct data props
  attributeSlotsLayoutData: Record<
    CoreCharacteristicKey,
    LayoutRectangle | null
  > | null
  availableValuesZoneLayoutData: LayoutRectangle | null
  onDrop: (
    draggedItem: DraggableValue,
    originKey: CoreCharacteristicKey | 'available',
    targetKey: CoreCharacteristicKey | 'available',
  ) => void
  itemHeight: number
  onHover?: (targetKey: CoreCharacteristicKey | 'available' | null) => void // Added onHover
}

const DraggableListItem: React.FC<DraggableListItemProps> = ({
  item,
  originKey,
  characteristicKeys,
  attributeSlotsLayoutData, // Changed
  availableValuesZoneLayoutData, // Changed
  onDrop,
  itemHeight,
  onHover, // Added onHover
}) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const startX = useSharedValue(0) // Added for new gesture handler
  const startY = useSharedValue(0) // Added for new gesture handler
  const lastHoveredKeyRef = useRef<CoreCharacteristicKey | 'available' | null>(
    null,
  ) // Added ref

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value
      startY.value = translateY.value
      // Clear hover on new drag start
      if (onHover && lastHoveredKeyRef.current !== null) {
        runOnJS(onHover)(null)
        lastHoveredKeyRef.current = null
      }
    })
    .onUpdate(event => {
      translateX.value = startX.value + event.translationX
      translateY.value = startY.value + event.translationY

      if (onHover) {
        let currentHoverKey: CoreCharacteristicKey | 'available' | null = null
        // Check attribute slots
        for (const key of characteristicKeys) {
          const layout = attributeSlotsLayoutData?.[key] // Changed: direct access
          if (layout) {
            if (
              event.absoluteX >= layout.x &&
              event.absoluteX <= layout.x + layout.width &&
              event.absoluteY >= layout.y &&
              event.absoluteY <= layout.y + layout.height
            ) {
              currentHoverKey = key
              break
            }
          }
        }
        // Check available values zone
        if (!currentHoverKey && availableValuesZoneLayoutData) {
          // Changed: direct access
          const layout = availableValuesZoneLayoutData
          if (
            event.absoluteX >= layout.x &&
            event.absoluteX <= layout.x + layout.width &&
            event.absoluteY >= layout.y &&
            event.absoluteY <= layout.y + layout.height
          ) {
            currentHoverKey = 'available'
          }
        }

        if (lastHoveredKeyRef.current !== currentHoverKey) {
          runOnJS(onHover)(currentHoverKey)
          lastHoveredKeyRef.current = currentHoverKey
        }
      }
    })
    .onEnd(event => {
      // Clear hover state first
      if (onHover && lastHoveredKeyRef.current !== null) {
        runOnJS(onHover)(null)
        lastHoveredKeyRef.current = null
      }

      let droppedOnTargetKey: CoreCharacteristicKey | 'available' | null = null

      // Check attribute slots
      for (const key of characteristicKeys) {
        const layout = attributeSlotsLayoutData?.[key] // Changed: direct access
        if (layout) {
          if (
            event.absoluteX >= layout.x &&
            event.absoluteX <= layout.x + layout.width &&
            event.absoluteY >= layout.y &&
            event.absoluteY <= layout.y + layout.height
          ) {
            droppedOnTargetKey = key
            break
          }
        }
      }

      // Check available values zone
      if (!droppedOnTargetKey && availableValuesZoneLayoutData) {
        // Changed: direct access
        const layout = availableValuesZoneLayoutData
        if (
          event.absoluteX >= layout.x &&
          event.absoluteX <= layout.x + layout.width &&
          event.absoluteY >= layout.y &&
          event.absoluteY <= layout.y + layout.height
        ) {
          droppedOnTargetKey = 'available'
        }
      }

      if (droppedOnTargetKey) {
        runOnJS(onDrop)(item, originKey, droppedOnTargetKey)
      }

      translateX.value = withSpring(0)
      translateY.value = withSpring(0)
    })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      zIndex: translateX.value !== 0 || translateY.value !== 0 ? 100 : 1,
    }
  })

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[styles.valueItem, { height: itemHeight - 10 }, animatedStyle]}
      >
        <Text style={styles.valueText}>{item.value}</Text>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  valueItem: {
    minWidth: 40,
    paddingHorizontal: 10,
    margin: 4,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: typeface.Color.Subtitle,
  },
})

export default DraggableListItem
