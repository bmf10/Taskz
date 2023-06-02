import { FC } from "react"
import Modal from "../Modal"
import Button from "../Button"

interface Props {
  readonly isOpen: boolean
  readonly onClose: (value: boolean) => void
  readonly title?: string
  readonly text: string
  readonly yesText?: string
  readonly noText?: string
  readonly onNo?: () => void
  readonly onYes?: () => void
}

const ConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  title,
  text,
  noText,
  yesText,
  onNo,
  onYes,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small" title={title}>
      <span>{text}</span>
      <div className="flex flex-row justify-end items-start gap-2 mt-4">
        <Button size="small" color="primary" onClick={onYes}>
          {yesText}
        </Button>
        <Button size="small" onClick={() => (onNo ? onNo() : onClose(false))}>
          {noText}
        </Button>
      </div>
    </Modal>
  )
}

ConfirmModal.defaultProps = {
  noText: "No",
  yesText: "Yes",
}

export default ConfirmModal
