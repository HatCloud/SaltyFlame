export type RootStackParamList = {
  AttributeAllocationScreen: {
    onCompleteNavigateToSceneId: string
    attributeValuesToAssign?: number[] // Made optional as it has a default in AttributeAllocationScreen
  }
  SceneScreen: { sceneId?: string } // sceneId is now optional
  // Add other screens here as needed
}
