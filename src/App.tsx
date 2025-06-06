import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SceneScreen from './ui/screens/SceneScreen'
import AttributeAllocationScreen from './ui/screens/AttributeAllocationScreen'
import palette from './theme/palette'
import { initialState, MyAppState, AppAction } from './interface/MyAppState'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { appReducer } from './reducer'
const PERSISTED_STATE_KEY = 'SaltyFlameAppState'
import { Dispatch } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './interface/navigation'

const Stack = createStackNavigator<RootStackParamList>()

// 创建两个 context，一个用于状态，一个用于 dispatch
export const AppStateContext = React.createContext<MyAppState>(initialState)
export const AppDispatchContext = React.createContext<Dispatch<AppAction>>(
  () => null,
)

function App(): React.ReactElement {
  const [state, dispatch] = React.useReducer(appReducer, initialState)

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

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={palette.Background}
            />
            <Stack.Navigator
              initialRouteName="SceneScreen"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: palette.Background },
              }}
            >
              <Stack.Screen name="SceneScreen" component={SceneScreen} />
              <Stack.Screen
                name="AttributeAllocationScreen"
                component={AttributeAllocationScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export default App
