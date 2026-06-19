import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  size?: number
  color?: string
}

const Plus: React.FC<Props> = ({ size = 25, color = '#6B6B6B', ...rest }) => (
  <Svg
    width={size}
    height={(size * 25) / 25}
    viewBox="0 0 25 25"
    fill="none"
    {...rest}
  >
    <Path
      d="M12.349 24.6795C11.0175 24.6795 10.1698 23.8024 10.1698 22.5017V14.5475H2.20958C0.907821 14.5475 0 13.6705 0 12.3397C0 10.9787 0.907821 10.1319 2.20958 10.1319H10.1698V2.20784C10.1698 0.907335 11.0175 0 12.349 0C13.7112 0 14.5586 0.907335 14.5586 2.20784V10.1319H22.4888C23.8206 10.1319 24.6984 10.9787 24.6984 12.3397C24.6984 13.6705 23.8206 14.5475 22.4888 14.5475H14.5586V22.5017C14.5586 23.8024 13.7112 24.6795 12.349 24.6795Z"
      fill={color}
    />
  </Svg>
)

export default Plus
