import {StyleSheet, Text, View} from 'react-native' // Removed Dimensions
import React from 'react' // Removed useState, useCallback
// Removed Animated and gesture handler imports
import palette from '../../theme/palette'
import {padding} from '../../theme/padding'
import {typeface} from '../../theme/typeface'
import {useAppReducer} from '../../hook'

// Removed animation-related constants and types

const CharacterCard: React.FC = React.memo(() => {
  const [state] = useAppReducer()
  const {characterData} = state
  // Removed isExpanded state, translateY shared value, onContentLayout, gestureHandler, animatedCardStyle

  if (!characterData) {
    return null
  }

  const displayValue = (value: any, defaultValue = 'N/A') => {
    if (value === null || typeof value === 'undefined' || value === '') {
      return defaultValue
    }
    return value
  }

  const characteristics = characterData.characteristics || {}
  const personalData = characterData.personalData || {}

  // Return simplified structure without animation wrappers
  return (
    <View style={styles.characterCardContainer}>
      <View style={styles.mainStatsRow}>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle} numberOfLines={1}>
            {displayValue(characterData.name)}
          </Text>
          <Text style={styles.characterCardColumnDesc} numberOfLines={1}>
            {displayValue(characterData.occupation)}
          </Text>
        </View>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle}>HP</Text>
          <Text style={styles.characterCardColumnDesc}>{`${displayValue(
            characterData.hitPoints?.current,
          )}/${displayValue(characterData.hitPoints?.max)}`}</Text>
        </View>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle}>SAN</Text>
          <Text style={styles.characterCardColumnDesc}>{`${displayValue(
            characterData.sanity?.current,
          )}/${displayValue(characterData.sanity?.max)}`}</Text>
        </View>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle}>攻击</Text>
          <Text style={styles.characterCardColumnDesc}>
            {displayValue(personalData.damageBonus)}
          </Text>
        </View>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle}>MOV</Text>
          <Text style={styles.characterCardColumnDesc}>N/A</Text>
        </View>
      </View>
      <View style={styles.characteristicsRow}>
        <Text style={styles.charValue}>
          STR: {displayValue(characteristics.str)}
        </Text>
        <Text style={styles.charValue}>
          CON: {displayValue(characteristics.con)}
        </Text>
        <Text style={styles.charValue}>
          SIZ: {displayValue(characteristics.siz)}
        </Text>
        <Text style={styles.charValue}>
          DEX: {displayValue(characteristics.dex)}
        </Text>
        <Text style={styles.charValue}>
          APP: {displayValue(characteristics.app)}
        </Text>
        <Text style={styles.charValue}>
          EDU: {displayValue(characteristics.edu)}
        </Text>
        <Text style={styles.charValue}>
          INT: {displayValue(characteristics.int)}
        </Text>
        <Text style={styles.charValue}>
          POW: {displayValue(characteristics.pow)}
        </Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  characterCardContainer: {
    position: 'absolute',
    bottom: 0, // Reset to fixed bottom position
    left: 0,
    right: 0,
    // height: undefined, // Let content define height, or set a fixed one for brief view
    backgroundColor: palette.BackgroundGrey,
    borderTopLeftRadius: padding.Normal,
    borderTopRightRadius: padding.Normal,
    paddingHorizontal: padding.Small,
    paddingVertical: padding.Small, // Restore vertical padding
    shadowRadius: 2,
    elevation: 5,
    // overflow: 'hidden', // Not strictly necessary without animation changing bounds
  },
  // Removed cardContentView style
  // Removed grabHandleContainer and grabHandle styles
  mainStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: padding.Small,
  },
  characterCardColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: padding.Mini,
  },
  characterCardColumnTitle: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Subtitle,
    fontWeight: typeface.Weight.Bold,
    marginBottom: padding.Mini,
  },
  characterCardColumnDesc: {
    fontSize: typeface.Size.Small,
    color: typeface.Color.Subtitle,
  },
  characteristicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: typeface.Color.Subtitle,
    paddingTop: padding.Small,
  },
  charValue: {
    fontSize: typeface.Size.Mini,
    color: typeface.Color.Subtitle,
    marginHorizontal: padding.Mini,
    marginBottom: padding.Mini,
  },
})

CharacterCard.displayName = 'CharacterCard'
export default CharacterCard
