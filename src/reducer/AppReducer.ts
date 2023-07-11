import {AppAction, AppState} from './interface'

export const appReducer = (state: AppState, action: AppAction) => {
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
