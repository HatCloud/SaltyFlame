import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import palette from '../../theme/palette'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import { useAppReducer } from '../../hook'
import { useI18n } from '../../i18n/useI18n'

const CharacterBottomSheet: React.FC = React.memo(() => {
  const [state] = useAppReducer()
  const { characterData } = state
  const insets = useSafeAreaInsets()
  const { t } = useI18n()
  // setShowCharacteristics was unused, showCharacteristics is used to toggle display
  const [showCharacteristics] = React.useState(false) // Keep showCharacteristics if it's meant to be toggled elsewhere, or remove if always false

  if (!characterData) {
    return null
  }

  const displayValue = (
    value: string | number | undefined | null,
    defaultValue = 'N/A',
  ) => {
    if (value === null || value === undefined || value === '') {
      // Added check for undefined
      return defaultValue
    }
    return String(value) // Ensure value is string for Text component
  }

  const characteristics = characterData.characteristics || {}
  // 비용 (cost/skills?) - Assuming this was for occupationSkills, which is Record<string, number>
  // const occupationSkills: Record<string, number> | undefined = characterData?.personalData?.occupationSkills;

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
            style={[styles.nameText, styles.occupationText]} // Added style
            numberOfLines={1}
          >
            {displayValue(characterData.occupation)}
          </Text>
        </View>

        <View style={styles.centerColumn}>
          <Text style={styles.statLabel}>{t('stats.hp')}</Text>
          <Text style={[styles.statText, styles.hpText]}>
            {' '}
            {/* Added style */}
            {displayValue(characterData.hitPoints?.current)}/
            {displayValue(characterData.hitPoints?.max)}
          </Text>
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.statLabel}>{t('stats.san')}</Text>
          <Text style={[styles.statText, styles.sanText]}>
            {' '}
            {/* Added style */}
            {displayValue(characterData.sanity?.current)}/
            {displayValue(characterData.sanity?.max)}
          </Text>
        </View>
      </View>

      {/* 属性值栏 */}
      {showCharacteristics ? (
        <View style={styles.attributesContainer}>
          <View style={styles.attributesRow}>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.str')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.str)}
              </Text>
            </Text>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.con')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.con)}
              </Text>
            </Text>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.siz')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.siz)}
              </Text>
            </Text>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.dex')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.dex)}
              </Text>
            </Text>
          </View>

          <View style={styles.attributesRow}>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.app')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.app)}
              </Text>
            </Text>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.edu')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.edu)}
              </Text>
            </Text>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.int')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.int)}
              </Text>
            </Text>
            <Text style={styles.attributeItem}>
              <Text style={styles.attributeLabel}>{t('stats.pow')} </Text>
              <Text style={styles.attributeValue}>
                {displayValue(characteristics.pow)}
              </Text>
            </Text>
          </View>
        </View>
      ) : null}
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
  occupationText: {
    // Style for occupation
    color: '#a0a5ad',
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
    // color: palette.Gold, // Base color can be set here if Gold is default
    fontWeight: '600',
  },
  hpText: {
    // Style for HP
    color: '#cc702d',
  },
  sanText: {
    // Style for Sanity
    color: '#82c6d7',
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
    color: '#a0a5ad',
    fontWeight: '500',
  },
})

CharacterBottomSheet.displayName = 'CharacterCard'
export default CharacterBottomSheet
