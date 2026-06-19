import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Colors } from '../constants/colors'
import AppText from './AppText'

interface Props {
  count: number
  onPress: () => void
  visible: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Button({ count, onPress, visible }: Props) {
  const translateY = useSharedValue(120)
  const press = useSharedValue(0)

  useEffect(() => {
    translateY.value = withSpring(visible ? 0 : 120, { stiffness: 1200 })
  }, [visible])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value + press.value * 5 },
      { scale: 1 - press.value * 0.03 },
    ],
  }))

  return (
    <AnimatedPressable
      style={[styles.wrapper, animatedStyle]}
      onPress={onPress}
      onPressIn={() => {
        press.value = withTiming(1, { duration: 90 })
      }}
      onPressOut={() => {
        press.value = withTiming(0, { duration: 140 })
      }}
    >
      <View style={styles.btn}>
        <AppText variant="h4" style={styles.label}>CONTINUE</AppText>
        <View style={styles.divider} />
        <AppText variant='body' style={styles.count}>{count} Players</AppText>
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
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.white,
    borderRadius: 32,
  },
  label: {
    color: Colors.dark,
  },
  divider: {
    width: 2,
    height: 36,
    marginTop: 8,
    backgroundColor: Colors.dark,
  },
  count: {
    color: Colors.dark,
  },
})
