import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyAppState } from '../interface/MyAppState'

// --- AsyncStorage Keys ---
const PERSISTED_STATE_KEY = 'SaltyFlameAppState'

// Fields to persist
const PERSISTED_FIELDS: (keyof MyAppState)[] = [
  'currentSceneKey',
  'history',
  'characterData',
  'language',
  'gameFlags',
]

// Function to save relevant parts of the state to AsyncStorage
export const saveStateToStorage = async (state: MyAppState) => {
  try {
    const stateToPersist: Partial<MyAppState> = {}
    PERSISTED_FIELDS.forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(stateToPersist as any)[key] = state[key]
    })
    const jsonValue = JSON.stringify(stateToPersist)
    await AsyncStorage.setItem(PERSISTED_STATE_KEY, jsonValue)
    console.log('State persisted to AsyncStorage:', stateToPersist)
  } catch (e) {
    console.error('Failed to save state to AsyncStorage:', e)
  }
}
