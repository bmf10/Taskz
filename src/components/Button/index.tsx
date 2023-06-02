import { Transition } from "@headlessui/react"
import type { FC, ReactNode } from "react"
import LoadingIcon from "../Icons/Loading"

interface Props {
  readonly children: ReactNode
  readonly className?: string
  readonly onClick?: () => void
  readonly disabled?: boolean
  readonly type?: "submit" | "button"
  readonly color?: "primary" | "secondary"
  readonly block?: boolean
  readonly loading?: boolean
  readonly size?: "normal" | "small"
}

const Button: FC<Props> = ({
  children,
  color,
  block,
  loading,
  size,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={`${
        color === "primary" ? "bg-blue-400 text-white" : "bg-white text-black"
      } ${block ? "w-full" : ""} ${
        size === "normal" ? "px-4 py-2" : "px-2 py-1"
      }  rounded-md shadow transition-shadow relative overflow-hidden hover:enabled:shadow-lg hover:disabled:cursor-not-allowed disabled:brightness-75 active:brightness-105 flex flex-row justify-center gap-2 ${
        props.className ? props.className : ""
      }`}
      disabled={props.disabled || loading}
    >
      <Transition
        show={loading}
        enter="transition duration-100"
        enterFrom="translate-y-7"
        enterTo="translate-y-0"
        leave="transition duration-100"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-7"
      >
        <LoadingIcon
          fill={
            color === "primary" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"
          }
        />
      </Transition>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: "button",
  block: false,
  color: "secondary",
  loading: false,
  size: "normal",
}

export default Button
