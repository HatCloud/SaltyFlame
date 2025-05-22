/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import SceneScreen from './ui/SceneScreen'
import palette from './theme/palette'
import { initialState, MyAppState } from './interface/MyAppState'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { appReducer } from './reducer'
import { Dispatch } from 'react'
import { AppAction } from './interface/MyAppState'

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
          <View style={styles.container}>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={palette.Background}
            />
            <SceneScreen />
          </View>
        </SafeAreaProvider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.Background,
  },
})

export default App
