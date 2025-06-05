/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler' // Needs to be at the top
import React from 'react'
import { StatusBar } from 'react-native' // Removed StyleSheet, View
import SceneScreen from './ui/screens/SceneScreen'
import AttributeAllocationScreen from './ui/screens/AttributeAllocationScreen'
import palette from './theme/palette'
import { initialState, MyAppState, AppAction } from './interface/MyAppState' // Added AppAction
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { appReducer } from './reducer'
import { Dispatch } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './interface/navigation' // Import the unified type

const Stack = createStackNavigator<RootStackParamList>()

// 创建两个 context，一个用于状态，一个用于 dispatch
export const AppStateContext = React.createContext<MyAppState>(initialState)
export const AppDispatchContext = React.createContext<Dispatch<AppAction>>(
  () => null,
)

function App(): React.ReactElement {
  const [state, dispatch] = React.useReducer(appReducer, initialState)

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
                headerShown: false, // Assuming no header is desired globally
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

// Styles are no longer needed here if the container View is removed
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: palette.Background,
//   },
// })

export default App
