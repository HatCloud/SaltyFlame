import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../interface/navigation'
import palette from '../theme/palette'
import SceneScreen from '../ui/screens/SceneScreen'
import AttributeAllocationScreen from '../ui/screens/AttributeAllocationScreen'

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={palette.Background}
      />
      <Stack.Navigator
        initialRouteName="SceneScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: palette.Background },
        }}
      >
        <Stack.Screen name="SceneScreen" component={SceneScreen} />
        <Stack.Screen
          name="AttributeAllocationScreen"
          component={AttributeAllocationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
