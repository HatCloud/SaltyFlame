import React, { Component, ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import palette from '../theme/palette'
import { padding } from '../theme/padding'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <View style={styles.container}>
            <Text style={styles.errorText}>出现了错误</Text>
            <Text style={styles.errorDetails}>{this.state.error?.message}</Text>
          </View>
        )
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: padding.Normal,
    backgroundColor: palette.Background,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: padding.Normal,
    color: palette.Tomato,
    textAlign: 'center',
  },
  errorDetails: {
    fontSize: 14,
    color: palette.Grey,
    textAlign: 'center',
  },
})
