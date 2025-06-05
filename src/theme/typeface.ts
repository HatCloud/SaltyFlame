import { Platform } from 'react-native'

const Color = {
  Content: '#FFFFFF',
  ContentDark: '#1c1b1c',
  Desc: '#8E8E93',
  Highlight: '#E8E8E8',
  Inactive: '#787878',
  Normal: '#9696A0',
  Striking: '#478CFE',
  Subtitle: '#616770',
}

const Size = {
  Ultra: 24,

  Extra: 21,
  Large: 16,
  XLarge: 18,

  Mini: 11,
  Normal: 14,
  Small: 12,
}

type WeightKey = 'Bold' | 'Medium' | 'Regular' | 'Heavy'
type WeightValue = '600' | '500' | '400' | '800' | 'normal' | 'bold'
const Weight: { [P in WeightKey]: WeightValue } = {
  Bold: Platform.select({
    android: 'bold',
    default: '600',
    ios: '600',
  }),
  Heavy: Platform.select({
    android: 'bold',
    default: '800',
    ios: '800',
  }),
  Medium: Platform.select({
    android: 'bold',
    default: '500',
    ios: '500',
  }),
  Regular: Platform.select({
    android: 'normal',
    default: '400',
    ios: '400',
  }),
}

const FONT_FAMILY: string =
  Platform.select({
    android: 'sans-serif',
    ios: 'System',
  }) || 'System'

export const typeface = {
  Color,
  Size,
  Weight,
  FONT_FAMILY,
}
