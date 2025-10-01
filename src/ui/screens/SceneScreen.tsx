import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import palette from '../../theme/palette'
import StoryCard from '../components/StoryCard'
import CharacterBottomSheet from '../components/CharacterBottomSheet'
import EffectModal from '../components/EffectModal'
import { useAppReducer } from '../../context/AppContext'
import { getEffectDescription } from '../../utils/effectUtils'
import { useI18n } from '../../i18n/useI18n'

const SceneScreen: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  const { t } = useI18n()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    if (state.effectInfoToShow && !modalVisible) {
      const effectDescription = getEffectDescription(state.effectInfoToShow, t)
      if (!effectDescription) {
        return
      }
      const { title, description } = effectDescription
      setModalContent({ title, description })
      setModalVisible(true)
    }
  }, [state.effectInfoToShow, t, modalVisible])

  const handleCloseModal = () => {
    setModalVisible(false)
    dispatch({ type: 'CLEAR_EFFECT_INFO_TO_SHOW' })
  }

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
      <EffectModal
        visible={modalVisible}
        title={modalContent.title}
        description={modalContent.description}
        buttonText={t('effect.ok')}
        onClose={handleCloseModal}
      />
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
