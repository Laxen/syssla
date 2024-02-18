import { useState, useRef } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import initialData from './initial-data'
import { Column } from './column'
import { DragDropContext } from 'react-beautiful-dnd'

export function App() {
  const [state, setState] = useState(initialData)

  const onDragEnd = result => {
    // TODO
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map(taskId => state.tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}
