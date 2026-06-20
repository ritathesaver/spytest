import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { colors } from '../constants/colors'
import Text from './Text'

interface Props {
  count: number
  onPress: () => void
  visible: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Button = ({ count, onPress, visible }: Props) => {
  const press = useSharedValue(0)

  const pressStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: press.value * 5 },
      { scale: 1 - press.value * 0.03 },
    ],
  }))

  if (!visible) return null

  return (
    <AnimatedPressable
      style={[styles.wrapper, pressStyle]}
      entering={SlideInDown.duration(260).easing(Easing.out(Easing.cubic))}
      exiting={SlideOutDown.duration(200).easing(Easing.in(Easing.cubic))}
      onPress={onPress}
      onPressIn={() => {
        press.value = withTiming(1, { duration: 90 })
      }}
      onPressOut={() => {
        press.value = withTiming(0, { duration: 140 })
      }}
    >
      <View style={styles.btn}>
        <Text variant="h4" style={styles.label}>CONTINUE</Text>
        <View style={styles.divider} />
        <Text variant="body" style={styles.count}>{count} Players</Text>
      </View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 28,
    paddingBottom: 22,
    paddingTop: 23,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 32,
  },
  label: {
    color: colors.dark,
  },
  divider: {
    width: 2,
    height: 36,
    marginTop: 8,
    backgroundColor: colors.dark,
  },
  count: {
    color: colors.dark,
  },
})

export default Button
