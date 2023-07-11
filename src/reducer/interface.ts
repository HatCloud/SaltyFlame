import {Scene} from '../data/Scene'
import {sceneData_CN} from '../ui/SceneScreen/data'

export interface AppState {
  currentSceneKey: string
  history: string[]
  sceneData: {[id: string]: Scene}
}

export const initialState: AppState = {
  currentSceneKey: '1',
  history: [],
  sceneData: sceneData_CN,
}

export interface AppAction {
  type: 'CHANGE_SCENE' | 'GO_BACK'
  payload?: any
}
