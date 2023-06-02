import { FC, ReactNode } from "react"

interface Props {
  readonly children: ReactNode
  readonly className?: string
}

const Paper: FC<Props> = ({ children, className }: Props) => {
  return (
    <div
      className={`relative bg-white w-full rounded-md p-4 shadow z-0 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  )
}

export default Paper
