import {useContext, useReducer} from 'react'
import {AppContext} from '../App'
import {appReducer} from './reducer'

export const useAppReducer = () => {
  const appState = useContext(AppContext)
  return useReducer(appReducer, appState)
}
