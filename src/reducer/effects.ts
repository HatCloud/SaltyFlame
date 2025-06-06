import { MyAppState } from '../interface/MyAppState'
import { Effect } from '../interface/Scene'
import { EffectType, SkillKey } from '../constant/enums'
import { Character } from '../interface/Character'
import { parseDiceString } from '../utils/utils'

export function applySingleEffect(
  state: MyAppState,
  effect: Effect,
): MyAppState {
  if (!state.characterData) {
    console.warn(
      'Attempted to apply effect when characterData is null. Effect:',
      effect,
    )
    return state
  }

  // Now we know state.characterData is not null, so it must be a Character object.
  const newCharacterData = { ...state.characterData } // This should be safe.
  const newGameFlags = { ...state.gameFlags }

  switch (effect.type) {
    case EffectType.CHANGE_HP: {
      let hpChange = 0
      if (typeof effect.value === 'number') {
        hpChange = effect.value
      } else if (typeof effect.value === 'string') {
        hpChange = parseDiceString(effect.value)
      }
      // Since hitPoints and hitPoints.current are mandatory in Character, direct assignment is fine.
      newCharacterData.hitPoints.current += hpChange
      console.log(
        `Applied HP Change: ${hpChange} (from ${effect.value}), New HP: ${newCharacterData.hitPoints.current}`,
      )
      break
    }
    case EffectType.CHANGE_SANITY: {
      let sanityChange = 0
      if (typeof effect.value === 'number') {
        sanityChange = effect.value
      } else if (typeof effect.value === 'string') {
        sanityChange = parseDiceString(effect.value)
      }
      // Since sanity and sanity.current are mandatory in Character, direct assignment is fine.
      newCharacterData.sanity.current += sanityChange
      console.log(
        `Applied Sanity Change: ${sanityChange} (from ${effect.value}), New Sanity: ${newCharacterData.sanity.current}`,
      )
      break
    }
    case EffectType.CHANGE_SKILL: {
      if (effect.target === undefined || effect.value === undefined) {
        console.warn('CHANGE_SKILL effect missing target or value.')
        break
      }
      const skillKey = effect.target as SkillKey // Type assertion
      const currentSkillValue = newCharacterData.skills[skillKey]

      if (currentSkillValue === undefined) {
        // If a skill is not present, we cannot change it.
        // This maintains consistency with the original logic of breaking if skill is undefined.
        console.warn(
          `Skill ${skillKey} not found on character. Cannot apply change.`,
        )
        break
      }

      let skillChange = 0
      if (typeof effect.value === 'number') {
        skillChange = effect.value
      } else if (typeof effect.value === 'string') {
        skillChange = parseDiceString(effect.value)
      } else {
        console.warn(
          `Invalid value type for CHANGE_SKILL: ${typeof effect.value}`,
        )
        break
      }

      const newSkillValue = currentSkillValue + skillChange
      newCharacterData.skills[skillKey] = newSkillValue

      console.log(
        `Applied Skill Change to ${skillKey}: ${skillChange} (from ${effect.value}), New Value: ${newSkillValue}`,
      )
      break
    }
    case EffectType.SET_FLAG:
      if (effect.gameFlag) {
        newGameFlags[effect.gameFlag] =
          effect.flagValue !== undefined ? effect.flagValue : true
        console.log(
          `Set flag: ${effect.gameFlag} to ${newGameFlags[effect.gameFlag]}`,
        )
      }
      break
    case EffectType.CLEAR_FLAG:
      if (effect.gameFlag) {
        delete newGameFlags[effect.gameFlag]
        console.log(`Cleared flag: ${effect.gameFlag}`)
      }
      break
    case EffectType.ADD_ITEM:
      if (effect.item) {
        // Ensure inventory exists and is an array
        if (!Array.isArray(newCharacterData.inventory)) {
          newCharacterData.inventory = [] // Should not happen if initialState is correct
        }

        const itemToAdd = effect.item
        let alreadyExists = false
        if (typeof itemToAdd === 'string') {
          alreadyExists = newCharacterData.inventory.some(
            invItem => typeof invItem === 'string' && invItem === itemToAdd,
          )
        } else {
          // itemToAdd is a Weapon object
          alreadyExists = newCharacterData.inventory.some(
            invItem =>
              typeof invItem !== 'string' && invItem.name === itemToAdd.name,
          )
        }

        if (!alreadyExists) {
          newCharacterData.inventory.push(itemToAdd)
          const itemName =
            typeof itemToAdd === 'string' ? itemToAdd : itemToAdd.name
          console.log(
            `Added item: ${itemName}. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        } else {
          const itemName =
            typeof itemToAdd === 'string' ? itemToAdd : itemToAdd.name
          console.log(
            `Item ${itemName} already in inventory. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        }
      }
      break
    case EffectType.REMOVE_ITEM:
      if (effect.item && Array.isArray(newCharacterData.inventory)) {
        const itemToRemove = effect.item
        let itemIndex = -1

        if (typeof itemToRemove === 'string') {
          itemIndex = newCharacterData.inventory.findIndex(
            invItem => typeof invItem === 'string' && invItem === itemToRemove,
          )
        } else {
          // itemToRemove is a Weapon object, remove by name
          itemIndex = newCharacterData.inventory.findIndex(
            invItem =>
              typeof invItem !== 'string' && invItem.name === itemToRemove.name,
          )
        }

        if (itemIndex > -1) {
          const removed = newCharacterData.inventory.splice(itemIndex, 1)[0]
          const itemName = typeof removed === 'string' ? removed : removed.name
          console.log(
            `Removed item: ${itemName}. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        } else {
          const itemName =
            typeof itemToRemove === 'string' ? itemToRemove : itemToRemove.name
          console.log(
            `Item ${itemName} not found in inventory. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        }
      }
      break
    case EffectType.MARK_SKILL_SUCCESS:
      if (effect.target && typeof effect.target === 'string') {
        // Ensure markedSkills exists and is an array
        if (!Array.isArray(newCharacterData.markedSkills)) {
          newCharacterData.markedSkills = []
        }
        // Add skill to markedSkills if not already present
        const skillToMark = effect.target as SkillKey // Type assertion
        if (!newCharacterData.markedSkills.includes(skillToMark)) {
          newCharacterData.markedSkills.push(skillToMark)
          console.log(
            `Marked skill success: ${
              skillToMark
            }. Marked skills: ${newCharacterData.markedSkills.join(', ')}`,
          )
        }
      } else {
        console.warn(
          'MARK_SKILL_SUCCESS effect missing or invalid target (skill name).',
        )
      }
      break
    default:
      console.warn(`Unhandled effect type: ${effect.type}`)
      break
  }
  // Ensure the returned characterData conforms to Character type.
  // If newCharacterData was correctly typed as Character from the spread, this should be fine.
  return {
    ...state,
    characterData: newCharacterData as Character,
    gameFlags: newGameFlags,
  }
}

export function applyAllEffects(
  state: MyAppState,
  effects?: Effect[],
): MyAppState {
  if (!effects || effects.length === 0) return state
  return effects.reduce(
    (currentState, effect) => applySingleEffect(currentState, effect),
    state,
  )
}
