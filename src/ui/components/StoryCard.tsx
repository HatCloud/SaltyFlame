import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useAppReducer } from '../../context/AppContext'
import { useGameState } from '../../hooks/useGameState'
import { useCheckSystem } from '../../hooks/useCheckSystem'
import { useSceneTransition } from '../../hooks/useSceneTransition'
import { useOccupationModal } from '../../hooks/useOccupationModal'
import { useOptionHandling } from '../../hooks/useOptionHandling'
import { useI18n } from '../../i18n/useI18n'
import StoryCardAnimation from './StoryCardAnimation'
import StoryCardContent from './StoryCardContent'
import OccupationInfoModal from './OccupationInfoModal'
import OptionButton from './OptionButton'

const StoryCard: React.FC = React.memo(() => {
  const [state] = useAppReducer()
  const {
    currentScene: currentSceneKey,
    history,
    actions: gameActions,
  } = useGameState()
  const { actions: checkActions } = useCheckSystem()
  const { t } = useI18n()

  // 使用重构后的 Hooks
  const {
    translateX,
    prevTranslateX,
    takeNumber,
    currentScene,
    changingScene,
  } = useSceneTransition({
    currentScene: state.sceneData?.[currentSceneKey],
    currentSceneKey,
    sceneData: state.sceneData,
    historyLength: history.length,
  })

  const {
    showOccupationModal,
    selectedOccupation,
    showModal,
    handleConfirm: handleOccupationConfirm,
    handleCancel: handleOccupationCancel,
  } = useOccupationModal()

  const { handleInteractOptionPress } = useOptionHandling({
    onShowOccupationModal: showModal,
  })

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    position: 'absolute',
  }))

  const handleResolveCheckOutcome = useCallback(() => {
    checkActions.resolveCheck()
  }, [checkActions])

  const goBack = useCallback(() => {
    gameActions.goBack()
  }, [gameActions])

  if (!currentScene) {
    return (
      <Animated.View style={[styles.storyCardContainer, animatedStyle]}>
        <Text style={styles.storyCardContentText}>{t('common.notFound')}</Text>
        <OptionButton onPress={goBack}>{t('common.goBack')}</OptionButton>
      </Animated.View>
    )
  }

  if (changingScene) {
    return (
      <>
        <View style={styles.overlay} pointerEvents="auto" />
        {/* 旧卡片滑出动画 */}
        <StoryCardAnimation translateX={prevTranslateX} isAbsolute>
          <StoryCardContent
            scene={currentScene}
            takeNumber={takeNumber}
            currentCheckAttempt={state.currentCheckAttempt}
            onGoBack={goBack}
            onResolveCheckOutcome={handleResolveCheckOutcome}
            onOptionPress={handleInteractOptionPress}
          />
        </StoryCardAnimation>
        {/* 新卡片滑入动画 */}
        {state.sceneData?.[state.currentSceneKey] && (
          <StoryCardAnimation translateX={translateX} isAbsolute>
            <StoryCardContent
              scene={state.sceneData[state.currentSceneKey]}
              takeNumber={state.history.length + 1}
              currentCheckAttempt={state.currentCheckAttempt}
              onGoBack={goBack}
              onResolveCheckOutcome={handleResolveCheckOutcome}
              onOptionPress={handleInteractOptionPress}
            />
          </StoryCardAnimation>
        )}
      </>
    )
  }

  return (
    <>
      <StoryCardAnimation translateX={translateX}>
        <StoryCardContent
          scene={currentScene}
          takeNumber={takeNumber}
          currentCheckAttempt={state.currentCheckAttempt}
          onGoBack={goBack}
          onResolveCheckOutcome={handleResolveCheckOutcome}
          onOptionPress={handleInteractOptionPress}
        />
      </StoryCardAnimation>
      <OccupationInfoModal
        visible={showOccupationModal}
        occupation={selectedOccupation}
        onConfirm={handleOccupationConfirm}
        onCancel={handleOccupationCancel}
      />
    </>
  )
})

const styles = StyleSheet.create({
  storyCardContainer: {
    marginHorizontal: 16,
    marginTop: 96,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowRadius: 2,
    backgroundColor: '#2a2a2a',
    marginBottom: 140,
  },
  storyCardContentText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 22.4,
    marginBottom: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
})

StoryCard.displayName = 'StoryCard'
export default StoryCard
