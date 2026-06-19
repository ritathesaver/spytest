import React from 'react'
import { Image, ImageBackground, StyleSheet } from 'react-native'

interface Props {
  children?: React.ReactNode
}

const Background = ({ children }: Props) => {
  return (
    <ImageBackground
      source={require('../../assets/pics/bg.png')}
      style={styles.fill}
      resizeMode="cover"
    >
      <Image
        source={require('../../assets/pics/pattern.png')}
        style={styles.pattern}
        resizeMode="repeat"
      />
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  pattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
})

export default Background
