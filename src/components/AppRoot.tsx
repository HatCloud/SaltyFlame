import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppProvider } from '../context/AppContext'
import AppNavigator from './AppNavigator'
import GlobalComponents from './GlobalComponents'
import { ErrorBoundary } from './ErrorBoundary'

const AppRoot: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <SafeAreaProvider>
          <AppNavigator />
          <GlobalComponents />
        </SafeAreaProvider>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default AppRoot
