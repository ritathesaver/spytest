import React from 'react'
import { StyleSheet, Text as RNText, TextProps, TextStyle } from 'react-native'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'

export type TextVariant =
  | 'h1' // Paytone One 42
  | 'h2' // Paytone One 40
  | 'h3' // Paytone One 27
  | 'h4' // Paytone One 24
  | 'h5' // Paytone One 20
  | 'body' // Montserrat Bold 18
  | 'caption' // Montserrat Medium 15

interface Props extends TextProps {
  variant?: TextVariant
  color?: string
}

const Text = ({
  variant = 'body',
  color = colors.white,
  style,
  ...rest
}: Props) => {
  return <RNText {...rest} style={[styles[variant], { color }, style]} />
}

const paytone: TextStyle = { fontFamily: fonts.paytone, fontWeight: '400' }

const styles = StyleSheet.create({
  h1: { ...paytone, fontSize: 42},
  h2: { ...paytone, fontSize: 40 },
  h3: { ...paytone, fontSize: 27},
  h4: { ...paytone, fontSize: 24},
  h5: { ...paytone, fontSize: 20},
  body: {
    fontFamily: fonts.montserratBold,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
  },
  caption: {
    fontFamily: fonts.montserratMedium,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
  },
})

export default Text
