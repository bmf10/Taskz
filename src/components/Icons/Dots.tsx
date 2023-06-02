import type { FC } from "react"

interface Props {
  readonly fill?: string
  readonly height?: number | string
  readonly width?: number | string
}

const DotsIcon: FC<Props> = ({ fill, height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
    style={{ fill, transform: ";msFilter:" }}
  >
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>{" "}
  </svg>
)

DotsIcon.defaultProps = {
  fill: "rgba(0, 0, 0, 1)",
  height: 24,
  width: 24,
}

export default DotsIcon
