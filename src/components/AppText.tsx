import React from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import { Colors } from '../constants/colors'
import { Fonts } from '../constants/fonts'

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

export default function AppText({
  variant = 'body',
  color = Colors.white,
  style,
  ...rest
}: Props) {
  return <Text {...rest} style={[styles[variant], { color }, style]} />
}

const paytone: TextStyle = { fontFamily: Fonts.paytone, fontWeight: '400' }

const styles = StyleSheet.create({
  h1: { ...paytone, fontSize: 42},
  h2: { ...paytone, fontSize: 40 },
  h3: { ...paytone, fontSize: 27},
  h4: { ...paytone, fontSize: 24},
  h5: { ...paytone, fontSize: 20},
  body: {
    fontFamily: Fonts.montserratBold,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
  },
  caption: {
    fontFamily: Fonts.montserratMedium,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
  },
})
