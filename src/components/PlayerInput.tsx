import React, { forwardRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../constants/colors'
import RoundButton from './RoundButton'
import { fonts } from '../constants/fonts'

interface Props {
  value: string
  onChange: (text: string) => void
  onAdd: () => void
  disabled?: boolean
}

const PlayerInput = forwardRef<TextInput, Props>(
  ({ value, onChange, onAdd, disabled }, ref) => {
    return (
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <TextInput
            ref={ref}
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Enter player name"
            placeholderTextColor={colors.textMuted}
            onSubmitEditing={onAdd}
            submitBehavior="submit"
            returnKeyType="next"
            editable={!disabled}
            maxLength={20}
          />
        </View>
        <RoundButton onPress={onAdd} disabled={disabled || !value} />
      </View>
    )
  },
)

export default PlayerInput

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '98%',
    marginBottom: 10,
    
  },
  inputBox: {
    flex: 1,
    backgroundColor: colors.dark,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    boxShadow: '0px 8px 8px #00000035',
    elevation: 4,
  },
  input: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.paytone,
    fontWeight: 'normal',
    fontStyle: 'normal',
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
})
