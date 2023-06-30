import Button from "@/components/Button"
import Dropdown from "@/components/Dropdown"
import DotsIcon from "@/components/Icons/Dots"
import PencilIcon from "@/components/Icons/Pencil"
import TrashIcon from "@/components/Icons/Trash"
import { ICard } from "@/models/Card"
import { Menu } from "@headlessui/react"
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react"

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  readonly card: ICard
  readonly onEdit: (card: ICard) => void
  readonly onDelete: (card: ICard) => void
}

type Ref = HTMLDivElement

const Card = forwardRef<Ref, Props>(
  ({ card, onDelete, onEdit, ...props }: Props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`px-4 py-2 shadow rounded-md ${props.className}`}
      >
        <div className="flex flex-row justify-between">
          <h1>{card.name}</h1>
          <Dropdown
            className="w-8 h-8"
            trigger={
              <Menu.Button>
                <div className="rounded-full p-1 hover:shadow">
                  <DotsIcon />
                </div>
              </Menu.Button>
            }
          >
            <Menu.Item>
              <button
                onClick={() => onDelete(card)}
                className="w-full flex flex-row  justify-start items-center gap-2 px-4 py-1 hover:bg-slate-200"
              >
                <TrashIcon width={20} height={20} />
                <span>Delete</span>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={() => onEdit(card)}
                className="w-full flex flex-row  justify-start items-center gap-2 px-4 py-1 hover:bg-slate-200"
              >
                <PencilIcon width={20} height={20} />
                <span>Edit</span>
              </button>
            </Menu.Item>
          </Dropdown>
        </div>
        <div className=" p-2 rounded-md shadow-inner mt-2 border-dashed flex flex-col gap-2">
          <Button color="primary" block size="small">
            + Add Task
          </Button>
        </div>
      </div>
    )
  }
)

export default Card
