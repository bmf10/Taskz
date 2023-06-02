import Dropdown from "@/components/Dropdown"
import DotsIcon from "@/components/Icons/Dots"
import PencilIcon from "@/components/Icons/Pencil"
import RocketIcon from "@/components/Icons/Rocket"
import TrashIcon from "@/components/Icons/Trash"
import { IBoard } from "@/models/Board"
import { Menu } from "@headlessui/react"
import Link from "next/link"
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react"

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  readonly board: IBoard
  readonly onEdit: (board: IBoard) => void
  readonly onDelete: (board: IBoard) => void
}

type Ref = HTMLDivElement

const Card = forwardRef<Ref, Props>(
  ({ board, onEdit, onDelete, ...props }: Props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`shadow py-2 px-4 rounded flex flex-row items-center ${props.className}`}
      >
        <div className="flex-1 ">{board.name}</div>
        <Link
          href={`/board/${board._id}`}
          className="rounded-full p-1 hover:shadow"
        >
          <RocketIcon />
        </Link>
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
              onClick={() => onDelete(board)}
              className="w-full flex flex-row  justify-start items-center gap-2 px-4 py-1 hover:bg-slate-200"
            >
              <TrashIcon width={20} height={20} />
              <span>Delete</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => onEdit(board)}
              className="w-full flex flex-row  justify-start items-center gap-2 px-4 py-1 hover:bg-slate-200"
            >
              <PencilIcon width={20} height={20} />
              <span>Edit</span>
            </button>
          </Menu.Item>
        </Dropdown>
      </div>
    )
  }
)

export default Card
