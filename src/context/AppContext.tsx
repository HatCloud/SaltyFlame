import React, { useContext, useReducer, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyAppState, AppAction, initialState } from '../interface/MyAppState'
import { appReducer } from '../reducer'

const PERSISTED_STATE_KEY = 'SaltyFlameAppState'

interface AppContextType {
  state: MyAppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = React.createContext<AppContextType | null>(null)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const loadState = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(PERSISTED_STATE_KEY)
        if (jsonValue !== null) {
          const persistedState = JSON.parse(jsonValue) as Partial<MyAppState>
          dispatch({ type: 'HYDRATE_STATE', payload: persistedState })
          console.log('App: State hydrated from storage on mount.')
        } else {
          console.log('App: No persisted state found in storage.')
        }
      } catch (e) {
        console.error(
          'App: Failed to load state from AsyncStorage on mount:',
          e,
        )
      }
    }

    loadState()
  }, [])

  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

// 为了保持向后兼容，保留原有的 hook
export const useAppReducer = () => {
  const { state, dispatch } = useAppContext()
  return [state, dispatch] as const
}
