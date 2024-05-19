import { Dispatch, FC, SetStateAction } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from '@hello-pangea/dnd'

import DisplayLinkItem from './DisplayLinkItem'

import { MdDragIndicator } from 'react-icons/md'
import { LinkSetupType } from '@/types'

interface DragDropLinkListProps {
  links: LinkSetupType[] | null
  isDragging: boolean
  setIsEditingId: Dispatch<SetStateAction<string>>
  onDragEnd: (result: DropResult) => void
}

const DragDropLinkList: FC<DragDropLinkListProps> = ({
  links,
  isDragging,
  setIsEditingId,
  onDragEnd
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full justify-between items-center gap-8">
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className="flex flex-col items-center gap-2 w-full"
              {...provided.droppableProps}
            >
              {links?.map((item, index) => {
                return (
                  <Draggable
                    key={item?.id}
                    draggableId={item?.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex w-full items-center gap-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          draggable={isDragging}
                        >
                          <MdDragIndicator
                            size={24}
                            className="text-grey-400"
                          />
                        </div>

                        <DisplayLinkItem
                          item={item}
                          isWebsite={item?.type?.id === 'website'}
                          onEditMode={() => setIsEditingId(item?.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default DragDropLinkList
