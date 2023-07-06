/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import SceneScreen from './src/ui/SceneScreen/index'
import palette from './src/theme/palette'

function App() {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={palette.Background}
            />
            <SceneScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: palette.Background,
    },
})

export default App
