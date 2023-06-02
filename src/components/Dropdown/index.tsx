import { Menu, Transition } from "@headlessui/react"
import { FC, Fragment, ReactNode } from "react"

interface Props {
  readonly children: ReactNode
  readonly trigger: ReactNode
  readonly className?: string
}

const Dropdown: FC<Props> = ({ children, trigger, className }) => {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      {trigger}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 ring-1 ring-black ring-opacity-5 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

Dropdown.defaultProps = {
  className: "",
}

export default Dropdown
