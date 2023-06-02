import type { FC } from "react"

interface Props {
  readonly fill?: string
  readonly height?: number | string
  readonly width?: number | string
}

const TrashIcon: FC<Props> = ({ fill, height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
    style={{ fill, transform: ";msFilter:" }}
  >
    <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
  </svg>
)

TrashIcon.defaultProps = {
  fill: "rgba(0, 0, 0, 1)",
  height: 24,
  width: 24,
}

export default TrashIcon
