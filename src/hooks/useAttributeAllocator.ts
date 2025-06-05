import { useState, useEffect } from 'react'
import { CoreCharacteristicKey } from '../constant/enums'
import { DraggableValue } from '../ui/components/DraggableListItem' // Assuming DraggableValue is exported from here

type AllocatedAttributes = Partial<
  Record<CoreCharacteristicKey, DraggableValue | null>
>

interface UseAttributeAllocatorProps {
  attributeValuesToAssign: number[]
  characteristicKeys: CoreCharacteristicKey[]
}

interface UseAttributeAllocatorReturn {
  availableValues: DraggableValue[]
  allocatedAttributes: AllocatedAttributes
  handleDrop: (
    draggedItem: DraggableValue,
    originKey: CoreCharacteristicKey | 'available',
    targetKey: CoreCharacteristicKey | 'available',
  ) => void
  handleUnassign: (charKey: CoreCharacteristicKey) => void
  isAllocationComplete: boolean
}

export const useAttributeAllocator = ({
  attributeValuesToAssign,
  characteristicKeys,
}: UseAttributeAllocatorProps): UseAttributeAllocatorReturn => {
  const [availableValues, setAvailableValues] = useState<DraggableValue[]>([])
  const [allocatedAttributes, setAllocatedAttributes] =
    useState<AllocatedAttributes>({})
  const [isAllocationComplete, setIsAllocationComplete] = useState(false)

  useEffect(() => {
    const initialDraggableValues = attributeValuesToAssign.map(
      (value, index) => ({
        id: `val-${index}-${value}`, // Ensure unique IDs
        value,
      }),
    )
    setAvailableValues(initialDraggableValues)

    const initialAllocations: AllocatedAttributes = {}
    characteristicKeys.forEach(key => {
      initialAllocations[key] = null
    })
    setAllocatedAttributes(initialAllocations)
  }, [attributeValuesToAssign, characteristicKeys])

  useEffect(() => {
    const allAllocated = characteristicKeys.every(
      key => allocatedAttributes[key] !== null,
    )
    const noValuesLeft = availableValues.length === 0
    setIsAllocationComplete(allAllocated && noValuesLeft)
  }, [allocatedAttributes, availableValues, characteristicKeys])

  const handleDrop = (
    draggedItem: DraggableValue,
    originKey: CoreCharacteristicKey | 'available',
    targetKey: CoreCharacteristicKey | 'available',
  ) => {
    setAllocatedAttributes(prevAllocated => {
      const newAllocated = { ...prevAllocated }
      setAvailableValues(prevAvailable => {
        let newAvailable = [...prevAvailable]

        if (originKey === 'available') {
          newAvailable = newAvailable.filter(item => item.id !== draggedItem.id)
        } else {
          newAllocated[originKey] = null
        }

        if (targetKey === 'available') {
          if (!newAvailable.find(item => item.id === draggedItem.id)) {
            newAvailable.push(draggedItem)
          }
        } else {
          const existingItemInTarget = newAllocated[targetKey]
          newAllocated[targetKey] = draggedItem

          if (existingItemInTarget) {
            if (originKey === 'available') {
              if (
                !newAvailable.find(item => item.id === existingItemInTarget.id)
              ) {
                newAvailable.push(existingItemInTarget)
              }
            } else {
              newAllocated[originKey] = existingItemInTarget
            }
          }
        }
        return newAvailable
      })
      return newAllocated
    })
  }

  const handleUnassign = (charKey: CoreCharacteristicKey) => {
    const itemToUnassign = allocatedAttributes[charKey]
    if (itemToUnassign) {
      setAllocatedAttributes(prev => ({ ...prev, [charKey]: null }))
      // Ensure the unassigned item is added back to availableValues if not already present
      setAvailableValues(prev =>
        prev.find(item => item.id === itemToUnassign.id)
          ? prev
          : [...prev, itemToUnassign],
      )
    }
  }

  return {
    availableValues,
    allocatedAttributes,
    handleDrop,
    handleUnassign,
    isAllocationComplete,
  }
}
