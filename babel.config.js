module.exports = function (api) {
  const isDev = api.env('development')

  const plugins = ['react-native-reanimated/plugin']

  if (!isDev) {
    plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
  }

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins,
  }
}
