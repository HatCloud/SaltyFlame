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
import { initialState } from './interface/MyAppState'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const AppContext = React.createContext(initialState)

function App(): React.ReactElement {
  return (
    <AppContext.Provider value={initialState}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={palette.Background}
          />
          <SceneScreen />
        </View>
      </SafeAreaProvider>
    </AppContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.Background,
  },
})

export default App
