import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  size?: number
  color?: string
}

const ChevronDown: React.FC<Props> = ({ size = 35, color = '#000', ...rest }) => (
  <Svg
    width={size}
    height={(size * 20) / 35}
    viewBox="0 0 35 20"
    fill="none"
    {...rest}
  >
    <Path
      d="M2.22351 17.2235L17.2235 2.22353L32.2235 17.2235"
      stroke={color}
      strokeWidth={4.44706}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ChevronDown
