import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import palette from '../../theme/palette'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'

interface EffectModalProps {
  visible: boolean
  title: string
  description: string
  buttonText: string
  onClose: () => void
}

const EffectModal: React.FC<EffectModalProps> = ({
  visible,
  title,
  description,
  buttonText,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>{buttonText}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: padding.Large,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: palette.BackgroundGrey,
    borderRadius: 10,
    padding: padding.Large,
    shadowColor: palette.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: typeface.Weight.Bold,
    color: palette.LightYellow,
    textAlign: 'center',
    marginBottom: padding.Medium,
  },
  description: {
    fontSize: typeface.Size.Large,
    color: palette.White,
    fontFamily: typeface.Weight.Regular,
    lineHeight: typeface.Size.Large * 1.6,
    marginBottom: padding.Large,
    textAlign: 'left',
  },
  button: {
    backgroundColor: palette.LightYellow,
    borderRadius: 5,
    paddingVertical: padding.Small,
    paddingHorizontal: padding.Medium,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: palette.Background,
    fontFamily: typeface.Weight.Bold,
  },
})

export default EffectModal
