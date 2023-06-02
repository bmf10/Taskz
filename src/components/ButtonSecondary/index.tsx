import type { FC, ReactNode } from "react"

interface Props {
  readonly children: ReactNode
  readonly color?: "primary" | "secondary"
  readonly className?: string
  readonly onClick?: () => void
  readonly disabled?: boolean
}

const ButtonSecondary: FC<Props> = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${props.className} underline hover:no-underline `}
    >
      {children}
    </button>
  )
}

export default ButtonSecondary
