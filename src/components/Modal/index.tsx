import { Dialog, Transition } from "@headlessui/react"
import { FC, Fragment, ReactNode } from "react"

interface Props {
  readonly isOpen: boolean
  readonly onClose: (value: boolean) => void
  readonly children: ReactNode
  readonly size?: "small" | "large"
  readonly title?: string
}

const Modal: FC<Props> = ({
  children,
  isOpen,
  onClose,
  size,
  title,
}: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${
                  size === "large" ? "max-w-xl" : "max-w-md"
                }  transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all relative`}
              >
                <div
                  className={`flex justify-between items-center ${
                    title ? "mb-4" : ""
                  }`}
                >
                  <h4 className="text-lg">{title}</h4>
                  <button onClick={() => onClose(!isOpen)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{
                        fill: "rgba(0, 0, 0, 1)",
                        transform: ";msFilter:",
                      }}
                    >
                      <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                    </svg>
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

Modal.defaultProps = {
  size: "large",
}

export default Modal
