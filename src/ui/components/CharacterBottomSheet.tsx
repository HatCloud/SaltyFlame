import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import palette from '../../theme/palette'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import { useAppReducer } from '../../hook'

const CharacterBottomSheet: React.FC = React.memo(() => {
  const [state] = useAppReducer()
  const { characterData } = state
  const insets = useSafeAreaInsets()

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

  return (
    <View
      style={[
        styles.characterCardContainer,
        { paddingBottom: insets.bottom || padding.Small },
      ]}
    >
      {/* 主要信息栏 */}
      <View style={styles.mainStatsRow}>
        <View style={styles.leftColumn}>
          <Text style={styles.statLabel}>
            {displayValue(characterData.name)}
          </Text>
          <Text
            style={[styles.nameText, { color: '#a0a5ad' }]}
            numberOfLines={1}
          >
            {displayValue(characterData.occupation)}
          </Text>
        </View>

        <View style={styles.centerColumn}>
          <Text style={styles.statLabel}>HP</Text>
          <Text style={[styles.statText, { color: '#cc702d' }]}>
            {displayValue(characterData.hitPoints?.current)}/
            {displayValue(characterData.hitPoints?.max)}
          </Text>
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.statLabel}>SAN</Text>
          <Text style={[styles.statText, { color: '#82c6d7' }]}>
            {displayValue(characterData.sanity?.current)}/
            {displayValue(characterData.sanity?.max)}
          </Text>
        </View>
      </View>

      {/* 属性值栏 */}
      <View style={styles.attributesContainer}>
        <View style={styles.attributesRow}>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>STR </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.str)}
            </Text>
          </Text>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>CON </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.con)}
            </Text>
          </Text>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>SIZ </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.siz)}
            </Text>
          </Text>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>DEX </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.dex)}
            </Text>
          </Text>
        </View>

        <View style={styles.attributesRow}>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>APP </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.app)}
            </Text>
          </Text>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>EDU </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.edu)}
            </Text>
          </Text>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>INT </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.int)}
            </Text>
          </Text>
          <Text style={styles.attributeItem}>
            <Text style={styles.attributeLabel}>POW </Text>
            <Text style={styles.attributeValue}>
              {displayValue(characteristics.pow)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  characterCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#161515',
    paddingHorizontal: padding.Medium,
    paddingTop: padding.Medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mainStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding.Large,
    marginBottom: padding.Medium,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center',
  },
  centerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
  },
  roleLabel: {
    fontSize: 12,
    color: palette.Grey,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    color: palette.White,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 16,
    color: '#888888',
    marginBottom: padding.Mini,
    fontFamily: typeface.Weight.Bold,
    letterSpacing: 2,
  },
  statText: {
    fontSize: 20,
    color: palette.Gold,
    fontWeight: '600',
    letterSpacing: padding.Mini,
  },
  attributesContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingVertical: padding.Small,
    gap: padding.Small,
  },
  attributesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attributeItem: {
    flex: 1,
    textAlign: 'center',
  },
  attributeLabel: {
    fontSize: 12,
    color: palette.Grey,
  },
  attributeValue: {
    fontSize: 12,
    color: palette.Gold,
    fontWeight: '500',
  },
})

CharacterBottomSheet.displayName = 'CharacterCard'
export default CharacterBottomSheet
