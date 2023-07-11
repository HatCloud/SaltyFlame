import {AppAction, MyAppState} from './interface/MyAppState'

export const appReducer = (state: MyAppState, action: AppAction) => {
  switch (action.type) {
    case 'CHANGE_SCENE':
      state.history.push(state.currentSceneKey)
      return {
        ...state,
        currentSceneKey: action.payload,
      }
    case 'GO_BACK':
      if (state.history.length === 0) {
        return state
      }
      return {
        ...state,
        currentSceneKey: state.history.pop() as string,
      }
  }
}
