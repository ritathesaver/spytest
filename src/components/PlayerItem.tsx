import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { Colors } from '../constants/colors'
import AppText from './AppText'

interface Props {
  name: string
  onRemove: () => void
}

const ITEM_MARGIN = 15

export default function PlayerItem({ name, onRemove }: Props) {
  const enter = useSharedValue(0)
  const visible = useSharedValue(1)

  useEffect(() => {
    enter.value = withTiming(1, { duration: 200 })
  }, [])

  const handleRemove = () => {
    visible.value = withTiming(0, { duration: 200 }, (finished) => {
      if (finished) scheduleOnRN(onRemove)
    })
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: enter.value * visible.value,
    // maxHeight: ITEM_HEIGHT * visible.value,
    marginBottom: ITEM_MARGIN * visible.value,
    transform: [{ translateY: (1 - enter.value) * 20 }],
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <AppText variant="h3" numberOfLines={1} style={styles.name}>
        {name}
      </AppText>
      <TouchableOpacity onPress={handleRemove} hitSlop={12}>
        <Text style={styles.x}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 16,
    overflow: 'hidden',
    boxShadow: '0px 8px 8px #00000035',
    elevation: 4,
  },
  name: {
    flex: 1,
    color: Colors.white,
    lineHeight: 30,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  x: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
})
