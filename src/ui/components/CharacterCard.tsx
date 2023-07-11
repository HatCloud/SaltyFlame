import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import palette from '../../theme/palette'
import {padding} from '../../theme/padding'
import {typeface} from '../../theme/typeface'
import {useAppReducer} from '../../hook'

const CharacterCard: React.FC = React.memo(() => {
  const [state] = useAppReducer()
  return (
    <View style={styles.characterCardContainer}>
      <View style={styles.characterCardColumn}>
        <Text style={styles.characterCardColumnTitle}>
          {state.characterData.name}
        </Text>
        <Text style={styles.characterCardColumnDesc}>
          {state.characterData.occupation}
        </Text>
      </View>
      <View style={styles.characterCardColumn}>
        <Text style={styles.characterCardColumnTitle}>HP</Text>
        <Text
          style={
            styles.characterCardColumnDesc
          }>{`${state.characterData.hitPoints.current}/${state.characterData.hitPoints.max}`}</Text>
      </View>
      <View style={styles.characterCardColumn}>
        <Text style={styles.characterCardColumnTitle}>SAN</Text>
        <Text
          style={
            styles.characterCardColumnDesc
          }>{`${state.characterData.sanity.current}/${state.characterData.sanity.max}`}</Text>
      </View>
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

  characterCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: palette.BackgroundGrey,
    borderTopLeftRadius: padding.Normal,
    borderTopRightRadius: padding.Normal,
    shadowRadius: 2,
    paddingBottom: 20,
  },
  characterCardColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterCardColumnTitle: {
    fontSize: typeface.Size.XLarge,
    color: typeface.Color.Subtitle,
    fontWeight: typeface.Weight.Bold,
  },
  characterCardColumnDesc: {
    marginTop: padding.Mini,
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Subtitle,
  },
})

CharacterCard.displayName = 'CharacterCard'
export default CharacterCard
