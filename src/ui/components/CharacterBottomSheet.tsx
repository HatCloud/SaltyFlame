import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import palette from '../../theme/palette'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import { useAppReducer } from '../../hook'
import { useI18n } from '../../i18n/useI18n'
import CharacterModal from './CharacterModal'

const CharacterBottomSheet: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer() // Added dispatch
  const { characterData, isCharacterModalVisible } = state
  const insets = useSafeAreaInsets()
  const { t } = useI18n()
  // setShowCharacteristics was unused, showCharacteristics is used to toggle display
  const [showCharacteristics] = React.useState(true) // Keep showCharacteristics if it's meant to be toggled elsewhere, or remove if always false

  const handlePress = () => {
    dispatch({ type: 'TOGGLE_CHARACTER_MODAL' })
  }

  console.log(
    'CharacterBottomSheet rendered isCharacterModalVisible:',
    isCharacterModalVisible,
  )

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
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={[
          styles.characterCardContainer,
          { paddingBottom: insets.bottom || padding.Small },
        ]}
      >
        {/* 主要信息栏 */}
        <View style={styles.mainStatsRow}>
          <View style={styles.leftColumn}>
            <Text style={styles.statLabel}>
              {displayValue(characterData.occupation)}
            </Text>
            <Text
              style={[styles.contentText, styles.nameText]} // Added style
            >
              {displayValue(characterData.name)}
            </Text>
          </View>

          <View style={styles.centerColumn}>
            <Text style={styles.statLabel}>{t('stats.hp')}</Text>
            <Text style={[styles.contentText, styles.hpText]}>
              {' '}
              {/* Added style */}
              {displayValue(characterData.hitPoints?.current)}/
              {displayValue(characterData.hitPoints?.max)}
            </Text>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.statLabel}>{t('stats.san')}</Text>
            <Text style={[styles.contentText, styles.sanText]}>
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
                  {displayValue(characteristics.STR)}
                </Text>
              </Text>
              <Text style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>{t('stats.con')} </Text>
                <Text style={styles.attributeValue}>
                  {displayValue(characteristics.CON)}
                </Text>
              </Text>
              <Text style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>{t('stats.siz')} </Text>
                <Text style={styles.attributeValue}>
                  {displayValue(characteristics.SIZ)}
                </Text>
              </Text>
              <Text style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>{t('stats.dex')} </Text>
                <Text style={styles.attributeValue}>
                  {displayValue(characteristics.DEX)}
                </Text>
              </Text>
            </View>

            <View style={styles.attributesRow}>
              <Text style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>{t('stats.app')} </Text>
                <Text style={styles.attributeValue}>
                  {displayValue(characteristics.APP)}
                </Text>
              </Text>
              <Text style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>{t('stats.edu')} </Text>
                <Text style={styles.attributeValue}>
                  {displayValue(characteristics.EDU)}
                </Text>
              </Text>
              <Text style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>{t('stats.int')} </Text>
                <Text style={styles.attributeValue}>
                  {displayValue(characteristics.INT)}
                </Text>
              </Text>
              <Text style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>{t('stats.pow')} </Text>
                <Text style={styles.attributeValue}>
                  {displayValue(characteristics.POW)}
                </Text>
              </Text>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
      <CharacterModal />
    </>
  )
})

const styles = StyleSheet.create({
  characterCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: palette.BackgroundDrak,
    paddingHorizontal: padding.Medium,
    paddingTop: padding.Medium,
    shadowColor: palette.Black,
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
  contentText: {
    fontWeight: typeface.Weight.Bold,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
  },
  nameText: {
    color: palette.Grey,
    textAlign: 'center',
    fontSize: 14,
  },
  statLabel: {
    fontSize: 16,
    color: typeface.Color.Desc,
    marginBottom: padding.Mini,
    fontFamily: typeface.Weight.Bold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  hpText: {
    // Style for HP
    color: palette.Tango,
    fontSize: 20,
  },
  sanText: {
    // Style for Sanity
    color: palette.Spray,
    fontSize: 20,
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
    color: typeface.Color.Inactive,
  },
  attributeValue: {
    fontSize: 12,
    color: palette.Grey,
    fontWeight: '500',
  },
})

CharacterBottomSheet.displayName = 'CharacterCard'
export default CharacterBottomSheet
