import React from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  FadeInDown,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated'
import { colors } from '../constants/colors'
import Text from './Text'
import { Cross } from './icons'

interface Props {
  name: string
  onRemove: () => void
}

const ITEM_MARGIN = 15

const PlayerItem = ({ name, onRemove }: Props) => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.duration(200)}
      exiting={FadeOut.duration(200)}
      layout={LinearTransition.duration(200)}
    >
      <Text variant="h3" numberOfLines={1} style={styles.name}>
        {name}
      </Text>
      <TouchableOpacity onPress={onRemove} hitSlop={16}>
        <Cross size={20} color={colors.white} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: ITEM_MARGIN,
    overflow: 'hidden',
    boxShadow: '0px 8px 8px #00000035',
    elevation: 4,
  },
  name: {
    flex: 1,
    color: colors.white,
    lineHeight: 30,
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingBottom: Platform.OS === 'ios' ? 0 : 4,
  },
})

export default PlayerItem
