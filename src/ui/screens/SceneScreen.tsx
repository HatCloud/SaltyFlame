import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import palette from '../../theme/palette'
import StoryCard from '../components/StoryCard'
import CharacterBottomSheet from '../components/CharacterBottomSheet'

const SceneScreen: React.FC = React.memo(() => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <StoryCard />
      </ScrollView>
      <CharacterBottomSheet />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.Background,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100,
  },
})

SceneScreen.displayName = 'SceneScreen'
export default SceneScreen
