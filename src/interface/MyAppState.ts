import {Scene} from './Scene'
import {SceneData_CN} from '../data/SceneData_CN'
import {Character} from './Character'
import FakerCharacter from '../utils/generateCharacter'

export interface MyAppState {
  currentSceneKey: string
  history: string[]
  sceneData: {[id: string]: Scene}
  characterData: Character
}

export const initialState: MyAppState = {
  currentSceneKey: '1',
  history: [],
  sceneData: SceneData_CN,
  characterData: FakerCharacter(),
}

export interface AppAction {
  type: 'CHANGE_SCENE' | 'GO_BACK'
  payload?: any
}
