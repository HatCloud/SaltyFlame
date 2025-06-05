import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useAppReducer } from '../../hook'
import { useI18n } from '../../i18n/useI18n'
import { Weapon } from '../../interface/Character'
import { CheckObjectKey, CheckObjectNames } from '../../constant/enums'
import { groupSkills, SkillCategory } from '../../utils/skillUtils'
import palette from '../../theme/palette'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
)

const InfoRow: React.FC<{
  label: string
  value: string | number | undefined | null
}> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>
      {value === null || value === undefined || value === ''
        ? 'N/A'
        : String(value)}
    </Text>
  </View>
)

const CharacterModal: React.FC = () => {
  const [state, dispatch] = useAppReducer()
  const { t, lang } = useI18n()
  const { characterData, isCharacterModalVisible } = state

  console.log(
    'CharacterModal rendered isCharacterModalVisible:',
    isCharacterModalVisible,
  )

  if (!characterData) {
    return null
  }

  const closeModal = () => {
    dispatch({ type: 'TOGGLE_CHARACTER_MODAL' })
  }

  const getSkillDisplayName = (skillKey: string): string => {
    return CheckObjectNames[skillKey as CheckObjectKey]?.[lang] || skillKey
  }

  const getCategoryDisplayName = (categoryKey: SkillCategory): string => {
    // SkillCategory enum values are i18n keys like 'skillCategory.combat'
    return t(categoryKey)
  }

  const groupedPlayerSkills = groupSkills(characterData.skills || {})

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCharacterModalVisible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{characterData.name}</Text>
              <Text style={styles.modalSubtitle}>
                {characterData.occupation}
              </Text>

              {/* Personal Info */}
              <SectionTitle title={t('charModal.personalInfo')} />
              <InfoRow label={t('charModal.age')} value={characterData.age} />
              <InfoRow label={t('charModal.sex')} value={characterData.sex} />
              <InfoRow
                label={t('charModal.birthplace')}
                value={characterData.birthplace}
              />
              <InfoRow
                label={t('charModal.residence')}
                value={characterData.residence}
              />

              {/* Status */}
              <SectionTitle title={t('charModal.status')} />
              <InfoRow
                label={t('stats.hp')}
                value={`${characterData.hitPoints.current}/${characterData.hitPoints.max}`}
              />
              {characterData.hitPoints.isMajorWound && (
                <Text style={styles.statusWarning}>
                  {t('charModal.majorWound')}
                </Text>
              )}
              {characterData.hitPoints.isDying && (
                <Text style={styles.statusWarning}>{t('charModal.dying')}</Text>
              )}
              <InfoRow
                label={t('stats.san')}
                value={`${characterData.sanity.current}/${characterData.sanity.max} (Start: ${characterData.sanity.starting})`}
              />
              {characterData.sanity.isTemporarilyInsane && (
                <Text style={styles.statusWarning}>
                  {t('charModal.tempInsane')}
                </Text>
              )}
              {characterData.sanity.isIndefinitelyInsane && (
                <Text style={styles.statusWarning}>
                  {t('charModal.indefInsane')}
                </Text>
              )}
              <InfoRow
                label={t('charModal.mp')}
                value={`${characterData.magicPoints.current}/${characterData.magicPoints.max}`}
              />
              <InfoRow label={t('stats.luck')} value={characterData.luck} />

              {/* Characteristics */}
              <SectionTitle title={t('charModal.characteristics')} />
              <View style={styles.characteristicsContainer}>
                {Object.entries(characterData.characteristics).map(
                  ([key, value]) => (
                    <InfoRow
                      key={key}
                      label={getSkillDisplayName(key.toUpperCase())} // Assuming keys are like 'str', need to match CheckObjectKey
                      value={value}
                    />
                  ),
                )}
              </View>

              {/* Derived Stats */}
              <SectionTitle title={t('charModal.derivedStats')} />
              <InfoRow
                label={t('charModal.damageBonus')}
                value={characterData.personalData.damageBonus}
              />
              <InfoRow
                label={t('charModal.build')}
                value={characterData.personalData.build}
              />
              <InfoRow
                label={t('charModal.dodgeValue')}
                value={characterData.skills?.[CheckObjectKey.DODGE]}
              />

              {/* Skills */}
              <SectionTitle title={t('charModal.skills')} />
              {Object.entries(groupedPlayerSkills).map(
                ([category, skillsInCategory]) => (
                  <View key={category} style={styles.skillCategoryContainer}>
                    <Text style={styles.skillCategoryTitle}>
                      {getCategoryDisplayName(category as SkillCategory)}
                    </Text>
                    {Object.entries(skillsInCategory).map(
                      ([skillKey, skillValue]) => (
                        <InfoRow
                          key={skillKey}
                          label={getSkillDisplayName(skillKey)}
                          value={skillValue}
                        />
                      ),
                    )}
                  </View>
                ),
              )}

              {/* Inventory */}
              <SectionTitle title={t('charModal.inventory')} />
              {characterData.inventory.length > 0 ? (
                characterData.inventory.map(
                  (item: string | Weapon, index: number) => (
                    <View key={index} style={styles.itemContainer}>
                      {typeof item === 'string' ? (
                        <Text style={styles.itemText}>{item}</Text>
                      ) : (
                        <View>
                          <Text style={styles.itemText}>
                            {getSkillDisplayName(item.name)} (Weapon)
                          </Text>
                          <Text style={styles.weaponDetailText}>
                            {`${t('charModal.weaponDamage')}: ${item.diceCount}D${item.dice}${item.range ? `, ${t('charModal.weaponRange')}: ${item.range}` : ''}${item.ammoCapacity ? `, ${t('charModal.weaponAmmo')}: ${item.ammoCapacity}` : ''}${item.malfunctions ? `, ${t('charModal.weaponMalf')}: ${item.malfunctions}` : ''}`}
                          </Text>
                          {item.notes && (
                            <Text style={styles.weaponDetailText}>
                              {`${t('charModal.weaponNotes')}: ${item.notes}`}
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                  ),
                )
              ) : (
                <Text style={styles.emptySectionText}>
                  {t('charModal.inventoryEmpty')}
                </Text>
              )}

              {/* Marked Skills */}
              <SectionTitle title={t('charModal.markedSkills')} />
              {characterData.markedSkills.length > 0 ? (
                characterData.markedSkills.map((skillKey, index) => (
                  <Text key={index} style={styles.itemText}>
                    {getSkillDisplayName(skillKey)}
                  </Text>
                ))
              ) : (
                <Text style={styles.emptySectionText}>
                  {t('charModal.noMarkedSkills')}
                </Text>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>{t('charModal.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background for the whole safe area
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40, // Give some space from top/bottom edges
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: palette.Background,
    borderRadius: 10,
    padding: padding.Medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: typeface.Weight.Bold,
    color: palette.White,
    textAlign: 'center',
    marginBottom: padding.Small,
  },
  modalSubtitle: {
    fontSize: 18,
    fontFamily: typeface.Weight.Regular,
    color: palette.Grey, // Changed from LightGrey
    textAlign: 'center',
    marginBottom: padding.Medium,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: typeface.Weight.Bold, // Changed from SemiBold
    color: palette.Gold,
    marginTop: padding.Medium,
    marginBottom: padding.Small,
    borderBottomWidth: 1,
    borderBottomColor: palette.BackgroundGrey, // Changed from DarkGrey
    paddingBottom: padding.Mini, // Changed from Tiny
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: padding.Mini, // Changed from Tiny
  },
  infoLabel: {
    fontSize: 16,
    color: palette.Grey, // Changed from MediumGrey
    fontFamily: typeface.Weight.Regular,
  },
  infoValue: {
    fontSize: 16,
    color: palette.White,
    fontFamily: typeface.Weight.Medium,
    textAlign: 'right',
  },
  statusWarning: {
    fontSize: 14,
    color: '#FF6347', // Changed from palette.Red to Tomato Red
    fontFamily: typeface.Weight.Medium,
    marginLeft: padding.Small,
    marginBottom: padding.Mini, // Changed from Tiny
  },
  characteristicsContainer: {
    // Could add styles for a grid or specific layout if needed
  },
  skillCategoryContainer: {
    marginBottom: padding.Small,
  },
  skillCategoryTitle: {
    fontSize: 18,
    fontFamily: typeface.Weight.Medium,
    color: palette.Gold, // Changed from LightBlue
    marginBottom: padding.Mini, // Changed from Tiny
  },
  itemContainer: {
    paddingVertical: padding.Mini, // Changed from Tiny
  },
  itemText: {
    fontSize: 16,
    color: palette.White,
    fontFamily: typeface.Weight.Regular,
  },
  weaponDetailText: {
    fontSize: 14,
    color: palette.Grey, // Changed from MediumGrey
    fontFamily: typeface.Weight.Regular,
    marginLeft: padding.Small,
  },
  emptySectionText: {
    fontSize: 16,
    color: palette.Grey, // Changed from MediumGrey
    fontFamily: typeface.Weight.Regular,
    textAlign: 'center',
    paddingVertical: padding.Small,
  },
  closeButton: {
    backgroundColor: palette.Gold,
    borderRadius: 5,
    paddingVertical: padding.Small,
    paddingHorizontal: padding.Medium,
    alignItems: 'center',
    marginTop: padding.Medium,
  },
  closeButtonText: {
    fontSize: 18,
    color: palette.Background, // Changed from Black
    fontFamily: typeface.Weight.Bold,
  },
})

export default CharacterModal
