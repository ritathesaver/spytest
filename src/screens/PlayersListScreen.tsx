import React, { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGameStore } from '../store/useGameStore'
import { RootStackParamList } from '../types'
import PlayerItem from '../components/PlayerItem'
import PlayerInput from '../components/PlayerInput'
import Button from '../components/Button'
import Background from '../components/Background'
import AppText from '../components/AppText'

const MAX_PLAYERS = 10
const MIN_TO_CONTINUE = 3

type Nav = StackNavigationProp<RootStackParamList, 'PlayersList'>

export default function PlayersListScreen() {
  const navigation = useNavigation<Nav>()
  const insets = useSafeAreaInsets()
  const { players, addPlayer, removePlayer, assignRoles } = useGameStore()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<TextInput>(null)
  const scrollRef = useRef<ScrollView>(null)

  const isFull = players.length >= MAX_PLAYERS
  const canContinue = players.length >= MIN_TO_CONTINUE

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isFull) return
    addPlayer(trimmed)
    setInputValue('')
    // когда список заполнен — инпут скрывается, поэтому убираем фокус/клавиатуру
    if (players.length + 1 >= MAX_PLAYERS) {
      Keyboard.dismiss()
    }
  }

  const handleContinue = () => {
    assignRoles()
    navigation.navigate('RoleReveal')
  }

  return (
    <Background>
        <View
          style={[
            styles.root,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}
        >
          <AppText variant="h4" style={styles.title}>
            Players
          </AppText>

          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              ref={scrollRef}
              style={styles.flex}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="none"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.list,
                { paddingBottom: canContinue ? 110 : 8 },
              ]}
              onContentSizeChange={() =>
                scrollRef.current?.scrollToEnd({ animated: true })
              }
            >
              {players.map((p) => (
                <PlayerItem
                  key={p.id}
                  name={p.name}
                  onRemove={() => removePlayer(p.id)}
                />
              ))}

              {!isFull && (
                <PlayerInput
                  ref={inputRef}
                  value={inputValue}
                  onChange={setInputValue}
                  onAdd={handleAdd}
                  disabled={isFull}
                />
              )}
            </ScrollView>
          </KeyboardAvoidingView>

          {!canContinue && (
            <AppText variant="caption" style={styles.hint}>
              Add at least 3 players to continue
            </AppText>
          )}
          <Button
            visible={canContinue}
            count={players.length}
            onPress={handleContinue}
          />
        </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 26,
  },
  list: {
    flexGrow: 1,
    paddingTop: 34
  },
  title: {
    textAlign: 'center',
    paddingVertical: 16,
  },
  hint: {
    paddingBottom: 36,
    textAlign: 'center',
  },
})
