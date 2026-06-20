import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { runOnJS } from 'react-native-worklets'
import { trigger } from 'react-native-haptic-feedback'
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler'
import { useGameStore } from '../store/useGameStore'
import { RootStackParamList, Role } from '../types'
import { playerImages } from '../constants/images'
import { colors } from '../constants/colors'
import Text from '../components/Text'
import { ChevronDown, Diva, Imposter } from '../components/icons'

type Nav = StackNavigationProp<RootStackParamList, 'RoleReveal'>

const { width, height } = Dimensions.get('window')
const MAX_PULL = height * 0.33
const REVEAL_THRESHOLD = -height * 0.2
const NEXT_DELAY = 450

const PIC_colors = ['#0089D6', '#48A917', '#D652CF']

const ROLE_INFO: Record<
  Role,
  { title: string;  color: string; Icon: typeof Imposter }
> = {
  Imposter: {
    title: 'IMPOSTER',
    color: colors.red,
    Icon: Imposter,
  },
  Diva: {
    title: 'DIVA',
    color: colors.white,
    Icon: Diva,
  },
}

const RoleRevealScreen = () => {
  const navigation = useNavigation<Nav>()
  const insets = useSafeAreaInsets()
  const { players, currentRevealIndex, nextPlayer } = useGameStore()

  const [finished, setFinished] = useState(false)
  const player = players[currentRevealIndex]

  const pull = useSharedValue(0)
  const revealed = useSharedValue(false)
  const locked = useSharedValue(false)

  const hintBob = useSharedValue(0)

  useEffect(() => {
    hintBob.value = withRepeat(withTiming(-10, { duration: 650 }), -1, true)
  }, [hintBob])

  const triggerHaptic = useCallback(() => {
    trigger("dragStart", {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    })
  }, [])

  const commitNext = useCallback(() => {
    if (currentRevealIndex >= players.length - 1) {
      setFinished(true)
      return
    }
    nextPlayer()
    locked.value = false
  }, [currentRevealIndex, players.length, nextPlayer, locked])

  const handleReleased = useCallback(() => {
    setTimeout(commitNext, NEXT_DELAY)
  }, [commitNext])

  const pan = usePanGesture({
    onBegin: () => {
      'worklet'
      if (locked.value) return
      runOnJS(triggerHaptic)()
    },
    onUpdate: (e) => {
      'worklet'
      if (locked.value) return
      const next = Math.min(0, Math.max(-MAX_PULL, e.translationY))
      pull.value = next
      if (next <= REVEAL_THRESHOLD && !revealed.value) {
        revealed.value = true
        runOnJS(triggerHaptic)()
      }
    },
    onDeactivate: () => {
      'worklet'
      if (locked.value) return
      const didReveal = revealed.value
      pull.value = withTiming(0, { duration: 220 })
      revealed.value = false
      if (didReveal) {
        locked.value = true
        runOnJS(handleReleased)()
      }
    },
  })


  const curtainStyle = useAnimatedStyle(() => ({
    top: pull.value,
  }))

  const hintStyle = useAnimatedStyle(() => ({
    top: hintBob.value,
  }))

  const handleStartGame = () => {
    navigation.navigate('PlayersList')
  }

  if (!player) return <View style={styles.root} />

  const info = ROLE_INFO[player.role ?? 'Diva']
  const imageSource = playerImages[player.image ?? 0]
  const curtainColor = PIC_colors[player.image ?? 0]

  return (
      <View style={[styles.root, { backgroundColor: curtainColor }]}>
        {finished ? (
          <View style={[styles.doneWrap, { paddingTop: insets.top }]}>
            <Text variant="h2" style={styles.doneTitle}>
              All set!
            </Text>
            <Text variant="body" style={styles.doneSubtitle}>
              Everyone knows their role. Let the game begin.
            </Text>
            <Pressable style={styles.startBtn} onPress={handleStartGame}>
              <Text variant="h4" style={styles.startLabel}>
                START
              </Text>
            </Pressable>
          </View>
        ) : (
            <View style={styles.card}>

              <View
                style={[
                  styles.rolePanel,
                  {
                    backgroundColor: colors.black,
                    paddingBottom: insets.bottom + 60,
                  },
                ]}
              >
                <info.Icon />
                <Text variant="h2" color={info.color}>
                  {info.title}
                </Text>
              </View>

              <GestureDetector gesture={pan}>
                <Animated.View
                  style={[
                    styles.curtain,
                    {
                      backgroundColor: curtainColor,
                      paddingTop: insets.top + 24,
                      paddingBottom: insets.bottom + 22,
                    },
                    curtainStyle,
                  ]}
                >
                  <Text variant="h1" color={colors.black} style={styles.playerName}>
                    {player.name}
                  </Text>
                  <Image
                    source={imageSource}
                    style={styles.playerImage}
                    resizeMode="contain"
                  />
                  <Animated.View style={[styles.hintWrap, hintStyle]}>
                    <Text
                      variant="h5"
                      color={colors.black}
                      style={styles.hintText}
                    >
                      Swipe up to reveal{'\n'}the secret word
                    </Text>
                    <ChevronDown size={30} color={colors.black} />
                  </Animated.View>
                </Animated.View>
              </GestureDetector>
            </View>
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    overflow: 'hidden',
    backgroundColor: colors.dark,
  },
  rolePanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 14,
  },
  curtain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height,
    alignItems: 'center',
  },
  playerName: {
    textAlign: 'center',
  },
  playerImage: {
    flex: 1,
    width: '100%',
    marginBottom: 46,
  },
  hintWrap: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 16,
  },
  hintText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  doneWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  doneTitle: {
    textAlign: 'center',
  },
  doneSubtitle: {
    textAlign: 'center',
    color: colors.whiteAlpha70,
  },
  startBtn: {
    marginTop: 24,
    backgroundColor: colors.white,
    borderRadius: 32,
    paddingHorizontal: 56,
    paddingVertical: 16,
  },
  startLabel: {
    color: colors.dark,
  },
})

export default RoleRevealScreen
