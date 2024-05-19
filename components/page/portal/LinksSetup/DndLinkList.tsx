import { FC, useEffect, useRef, useState } from 'react'
import { MdDragIndicator } from 'react-icons/md'
import {
  draggable,
  dropTargetForElements,
  monitorForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import {
  Edge,
  attachClosestEdge,
  extractClosestEdge
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box'
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'

import useSetup from '@/hooks/useSetup'
import DisplayLinkItem from './DisplayLinkItem'
import PreviewLinkItem from './PreviewLinkItem'
import ClientPortal from '@/components/ui/ClientPortal'
import { LinkSetupType } from '@/types'

interface DragDropLinkListProps {
  links: LinkSetupType[] | null
  isDragging: boolean
  setIsEditingId: React.Dispatch<React.SetStateAction<string>>
}

interface DndItemProps {
  item: LinkSetupType
  index: number
  isDragging: boolean
  setIsEditingId: React.Dispatch<React.SetStateAction<string>>
}

type DraggableState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'dragging' }

const idleState: DraggableState = { type: 'idle' }
const draggingState: DraggableState = { type: 'dragging' }

const DndItem = ({ item, index, isDragging, setIsEditingId }: DndItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const [draggableState, setDraggableState] =
    useState<DraggableState>(idleState)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  useEffect(() => {
    const element = itemRef.current
    const data = { item, index, instanceId: item?.id }
    if (!element || dragHandleRef.current === null) {
      return
    }
    return combine(
      draggable({
        element,
        dragHandle: dragHandleRef.current,
        getInitialData: () => ({ type: 'link', id: item?.id, index }),
        onGenerateDragPreview({ nativeSetDragImage, ...rest }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '16px',
              y: '8px'
            }),
            render({ container }) {
              setDraggableState({ type: 'preview', container })

              return () => setDraggableState(draggingState)
            }
          })
        },
        onDragStart() {
          setDraggableState(draggingState)
          console.log('onDragStart')
        },
        onDrop() {
          setDraggableState(idleState)
          console.log('onDrop')
          // update({ links: items }) items 是 reorder 之後的結果
        }
      }),
      dropTargetForElements({
        element,
        getData({ input }) {
          //   altKey: false
          //   button: 0
          //   buttons: 1
          //   clientX: 40
          //   clientY: 351
          //   ctrlKey: false
          //   metaKey: false
          //   pageX: 40
          //   pageY: 351
          //   shiftKey: false

          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom']
          })
        },
        onDrag({ self, source }) {
          // source 有 element, data, dragHandle
          // data 則是 getInitialData 的結果

          const isSource = source.element === element
          if (isSource) {
            setClosestEdge(null)
            return
          }

          const closestEdge = extractClosestEdge(self.data)
          // 回傳 allowedEdges 設定的 top or bottom
          const sourceIndex = source.data.index as number
          const isItemBeforeSource = index < sourceIndex
          const isItemAfterSource = index > sourceIndex

          const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === 'bottom') ||
            (isItemAfterSource && closestEdge === 'top')

          if (isDropIndicatorHidden) {
            setClosestEdge(null)
            return
          }

          setClosestEdge(closestEdge)
        },
        onDragLeave() {
          setClosestEdge(null)
        },
        onDrop() {
          setClosestEdge(null)
        }
      })
    )
  }, [index, isDragging, item])
  return (
    <>
      <div className="flex w-full relative" key={item?.id} ref={itemRef}>
        <div
          className="flex w-full items-center gap-2 relative"
          //   ref={provided.innerRef}
          //   {...provided.draggableProps}
        >
          <div ref={dragHandleRef}>
            <MdDragIndicator size={24} className="text-grey-400" />
          </div>

          <DisplayLinkItem
            item={item}
            dragMode={isDragging}
            isDragging={draggableState.type === 'dragging'}
            isWebsite={item?.type?.id === 'website'}
            onEditMode={() => setIsEditingId(item?.id)}
          />
        </div>
        {closestEdge && <DropIndicator edge={closestEdge} gap="1px" />}
      </div>
      {draggableState.type === 'preview' && (
        <ClientPortal selector={draggableState.container}>
          <PreviewLinkItem item={item} />
        </ClientPortal>
      )}
    </>
  )
}

const DndLinkList: FC<DragDropLinkListProps> = ({
  links,
  isDragging,
  setIsEditingId
  //   onDragEnd
}) => {
  const { update } = useSetup((state) => state)

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => {
        // source 有 element, data, dragHandle
        // data 則是 getInitialData 的結果

        return isDragging
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0]
        if (!target) {
          return
        }

        const sourceData = source.data
        const targetData = target.data

        if (sourceData.index === targetData.index) {
          return
        }
        const closestEdgeOfTarget = extractClosestEdge(targetData)
        const startIndex = (sourceData.index as number) || 0
        const finishIndex = (targetData.index as number) || 0
        const isItemBeforeSource = finishIndex < startIndex
        const isItemAfterSource = finishIndex > startIndex
        const shouldNotReorder =
          (isItemBeforeSource && closestEdgeOfTarget === 'bottom') ||
          (isItemAfterSource && closestEdgeOfTarget === 'top')

        if (shouldNotReorder) {
          return
        }

        const reorderItems = reorder({
          list: links || [],
          startIndex,
          finishIndex
        })

        update({ links: reorderItems })
      }
    })
  }, [isDragging, links, update])

  return (
    <div className="flex w-full justify-between items-center gap-8">
      <div
        // ref={provided.innerRef}
        className="flex flex-col items-center gap-2 w-full"
        // {...provided.droppableProps}
      >
        {links?.map((item, index) => {
          return (
            <DndItem
              key={item?.id}
              index={index}
              item={item}
              isDragging={isDragging}
              setIsEditingId={setIsEditingId}
            />
          )
        })}
        {/* {provided.placeholder} */}
      </div>
    </div>
  )
}

export default DndLinkList
