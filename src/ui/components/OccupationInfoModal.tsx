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
import { useI18n } from '../../i18n/useI18n'
import { OccupationTemplate } from '../../interface/OccupationTemplate'
import { CheckObjectKey, CheckObjectNames } from '../../constant/enums'
import palette from '../../theme/palette'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'

interface OccupationInfoModalProps {
  visible: boolean
  occupation: OccupationTemplate | null
  onConfirm: () => void
  onCancel: () => void
}

const OccupationInfoModal: React.FC<OccupationInfoModalProps> = ({
  visible,
  occupation,
  onConfirm,
  onCancel,
}) => {
  const { t, lang } = useI18n()

  if (!occupation) {
    return null
  }

  const occupationName = lang === 'cn' ? occupation.name_cn : occupation.name_en
  const occupationDescription =
    lang === 'cn' ? occupation.description_cn : occupation.description_en

  const getSkillDisplayName = (skillKey: CheckObjectKey): string => {
    return CheckObjectNames[skillKey]?.[lang] || skillKey
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{occupationName}</Text>

              {/* Description */}
              <Text style={styles.description}>{occupationDescription}</Text>

              {/* Credit Rating */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {t('occupationModal.creditRating')}
                </Text>
                <Text style={styles.infoText}>{occupation.creditRating}</Text>
              </View>

              {/* Occupational Skills */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {t('occupationModal.occupationalSkills')}
                </Text>
                {Object.entries(occupation.occupationalSkillTargets).map(
                  ([skillKey, targetValue]) => (
                    <View key={skillKey} style={styles.skillRow}>
                      <Text style={styles.skillName}>
                        {getSkillDisplayName(skillKey as CheckObjectKey)}
                      </Text>
                      <Text style={styles.skillValue}>{targetValue}%</Text>
                    </View>
                  ),
                )}
              </View>

              {/* Interest Skills */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {t('occupationModal.interestSkills')}
                </Text>
                <Text style={styles.interestSkillsNote}>
                  {t('occupationModal.interestSkillsNote')}
                </Text>
                {occupation.interestSkills.map((skillKey, index) => (
                  <Text key={index} style={styles.interestSkillItem}>
                    • {getSkillDisplayName(skillKey)}
                  </Text>
                ))}
              </View>

              {/* Example Character */}
              {(occupation.exampleCharacterName_cn ||
                occupation.exampleCharacterName_en) && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>
                    {t('occupationModal.exampleCharacter')}
                  </Text>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>
                      {t('occupationModal.characterName')}:
                    </Text>
                    <Text style={styles.value}>
                      {lang === 'cn'
                        ? occupation.exampleCharacterName_cn
                        : occupation.exampleCharacterName_en}
                    </Text>
                  </View>
                  {occupation.exampleCharacterSex && (
                    <View style={styles.infoRow}>
                      <Text style={styles.label}>
                        {t('occupationModal.sex')}:
                      </Text>
                      <Text style={styles.value}>
                        {occupation.exampleCharacterSex}
                      </Text>
                    </View>
                  )}
                  {occupation.exampleCharacterAge && (
                    <View style={styles.infoRow}>
                      <Text style={styles.label}>
                        {t('occupationModal.age')}:
                      </Text>
                      <Text style={styles.value}>
                        {occupation.exampleCharacterAge}
                      </Text>
                    </View>
                  )}
                  {(occupation.exampleCharacterBirthplace_cn ||
                    occupation.exampleCharacterBirthplace_en) && (
                    <View style={styles.infoRow}>
                      <Text style={styles.label}>
                        {t('occupationModal.birthplace')}:
                      </Text>
                      <Text style={styles.value}>
                        {lang === 'cn'
                          ? occupation.exampleCharacterBirthplace_cn
                          : occupation.exampleCharacterBirthplace_en}
                      </Text>
                    </View>
                  )}
                  {(occupation.exampleCharacterResidence_cn ||
                    occupation.exampleCharacterResidence_en) && (
                    <View style={styles.infoRow}>
                      <Text style={styles.label}>
                        {t('occupationModal.residence')}:
                      </Text>
                      <Text style={styles.value}>
                        {lang === 'cn'
                          ? occupation.exampleCharacterResidence_cn
                          : occupation.exampleCharacterResidence_en}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* Background */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {t('occupationModal.background')}
                </Text>
                {(() => {
                  const background =
                    lang === 'cn'
                      ? occupation.background_cn
                      : occupation.background_en
                  return Object.entries(background).map(([key, value]) => {
                    if (
                      !value ||
                      (typeof value === 'string' && value.trim() === '')
                    )
                      return null
                    return (
                      <View key={key} style={styles.backgroundItem}>
                        <Text style={styles.backgroundLabel}>
                          {t(`charModal.background.${key}`)}:
                        </Text>
                        <Text style={styles.backgroundValue}>
                          {String(value)}
                        </Text>
                      </View>
                    )
                  })
                })()}
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>
                  {t('occupationModal.cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={onConfirm}
              >
                <Text style={styles.confirmButtonText}>
                  {t('occupationModal.confirm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  modalContent: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: palette.BackgroundGrey,
    borderRadius: 10,
    padding: padding.Medium,
    shadowColor: palette.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: typeface.Weight.Bold,
    color: palette.LightYellow,
    textAlign: 'center',
    marginBottom: padding.Medium,
  },
  description: {
    fontSize: typeface.Size.Large,
    color: palette.White,
    fontFamily: typeface.Weight.Regular,
    lineHeight: typeface.Size.Large * 1.5,
    marginBottom: padding.Medium,
    textAlign: 'left',
  },
  sectionContainer: {
    marginBottom: padding.Medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: typeface.Weight.Bold,
    color: palette.LightYellow,
    marginBottom: padding.Small,
    borderBottomWidth: 1,
    borderBottomColor: palette.BackgroundGrey,
    paddingBottom: padding.Mini,
  },
  infoText: {
    fontSize: typeface.Size.Large,
    color: palette.White,
    fontFamily: typeface.Weight.Regular,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: padding.Mini,
  },
  skillName: {
    fontSize: typeface.Size.Normal,
    color: palette.White,
    fontFamily: typeface.Weight.Regular,
  },
  skillValue: {
    fontSize: typeface.Size.Normal,
    color: palette.LightYellow,
    fontFamily: typeface.Weight.Medium,
  },
  interestSkillsNote: {
    fontSize: typeface.Size.Normal,
    color: palette.Grey,
    fontFamily: typeface.Weight.Regular,
    fontStyle: 'italic',
    marginBottom: padding.Small,
  },
  interestSkillItem: {
    fontSize: typeface.Size.Normal,
    color: palette.White,
    fontFamily: typeface.Weight.Regular,
    paddingVertical: padding.Mini,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: padding.Mini,
    alignItems: 'center',
  },
  label: {
    fontSize: typeface.Size.Normal,
    color: palette.Grey,
    fontFamily: typeface.Weight.Regular,
  },
  value: {
    fontSize: typeface.Size.Normal,
    color: palette.White,
    fontFamily: typeface.Weight.Medium,
    textAlign: 'right',
    flexShrink: 1,
  },
  backgroundItem: {
    marginBottom: padding.Small,
  },
  backgroundLabel: {
    fontSize: typeface.Size.Normal,
    color: palette.Grey,
    fontFamily: typeface.Weight.Medium,
    marginBottom: padding.Mini,
  },
  backgroundValue: {
    fontSize: typeface.Size.Normal,
    color: palette.White,
    fontFamily: typeface.Weight.Regular,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: padding.Medium,
    gap: padding.Small,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: padding.Small,
    paddingHorizontal: padding.Medium,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: palette.Grey,
  },
  confirmButton: {
    backgroundColor: palette.LightYellow,
  },
  cancelButtonText: {
    fontSize: 18,
    color: palette.White,
    fontFamily: typeface.Weight.Bold,
  },
  confirmButtonText: {
    fontSize: 18,
    color: palette.Background,
    fontFamily: typeface.Weight.Bold,
  },
})

export default OccupationInfoModal
