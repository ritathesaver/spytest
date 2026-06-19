import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../constants/colors'
import { Plus } from './icons'

interface Props {
  onPress: () => void
  disabled?: boolean
}

const RoundButton: React.FC<Props> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Plus size={26} color={colors.textMuted} />
    </TouchableOpacity>
  )
}

export default RoundButton

const styles = StyleSheet.create({
  btn: {
    width: 61,
    height: 61,
    borderRadius: 32,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '5.23px 5.23px 2.57px #00000040',
    elevation: 4,
  },
  btnDisabled: {
    opacity: 0.9,
  },
})
