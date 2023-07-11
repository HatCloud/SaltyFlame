/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import SceneScreen from './src/ui/SceneScreen'
import palette from './src/theme/palette'
import {initialState} from './src/interface/MyAppState'

export const AppContext = React.createContext(initialState)

function App() {
  return (
    <AppContext.Provider value={initialState}>
      <View style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={palette.Background}
        />
        <SceneScreen />
      </View>
    </AppContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.Background,
  },
})

export default App
