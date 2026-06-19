import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  size?: number
  color?: string
}

const ChevronLeft: React.FC<Props> = ({ size = 15, color = '#000', ...rest }) => (
  <Svg
    width={size}
    height={(size * 24) / 15}
    viewBox="0 0 15 24"
    fill="none"
    {...rest}
  >
    <Path
      d="M12.5183 1.5022L1.5022 11.5168L12.5183 21.5314"
      stroke={color}
      strokeWidth={3.00439}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ChevronLeft
