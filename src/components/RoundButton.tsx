import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Colors } from '../constants/colors'

interface Props {
  label?: string
  onPress: () => void
  disabled?: boolean
}

const RoundButton: React.FC<Props> = ({ label = '+', onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default RoundButton

const styles = StyleSheet.create({
  btn: {
    width: 61,
    height: 61,
    borderRadius: 32,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '5.23px 5.23px 2.57px #00000040',
    elevation: 4,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '700',
  },
})
