import { useContext } from 'react'
import { AppStateContext, AppDispatchContext } from './App'

export const useAppReducer = () => {
  const state = useContext(AppStateContext)
  const dispatch = useContext(AppDispatchContext)
  return [state, dispatch] as const
}
