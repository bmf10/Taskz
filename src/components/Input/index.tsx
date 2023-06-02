import { Transition } from "@headlessui/react"
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"

interface Props {
  readonly inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  readonly label?: string
  readonly labelClassName?: string
  readonly helper?: string
  readonly error?: string
}

const Input: FC<Props> = ({
  inputProps,
  label,
  labelClassName,
  error,
  helper,
}: Props) => {
  return (
    <div className="mb-4 overflow-hidden transition-all">
      {label ? (
        <label
          className={`text-gray-700 text-sm mb-2 ${
            labelClassName ? labelClassName : ""
          }`}
        >
          {label}
        </label>
      ) : undefined}

      <input
        {...inputProps}
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }  `}
      />
      <div className="flex flex-col">
        {helper ? (
          <span className="text-xs text-gray-600">{helper}</span>
        ) : undefined}
        <Transition
          show={!!error}
          enter="transition duration-100"
          enterFrom="translate-y-7"
          enterTo="translate-y-0"
          leave="transition duration-100"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-7"
        >
          <span className="text-xs text-red-600">{error}</span>
        </Transition>
      </div>
    </div>
  )
}

export default Input
