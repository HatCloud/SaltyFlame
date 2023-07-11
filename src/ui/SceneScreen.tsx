import {ScrollView, StyleSheet, View} from 'react-native'
import React from 'react'
import palette from '../theme/palette'
import StoryCard from './components/StoryCard'
import CharacterCard from './components/CharacterCard'

const SceneScreen: React.FC = React.memo(() => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StoryCard />
      </ScrollView>
      <CharacterCard />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 40,
    backgroundColor: palette.Background,
  },
})

SceneScreen.displayName = 'SceneScreen'
export default SceneScreen
