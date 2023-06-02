import type { FC } from "react"

interface Props {
  readonly fill?: string
  readonly height?: number | string
  readonly width?: number | string
}

const LoadingIcon: FC<Props> = ({ fill, height, width }) => (
  <svg
    className="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={{
      fill,
      transform: ";msFilter:",
    }}
  >
    <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
  </svg>
)

LoadingIcon.defaultProps = {
  fill: "rgba(0, 0, 0, 1)",
  height: 24,
  width: 24,
}

export default LoadingIcon
