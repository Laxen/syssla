import { createContext } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import initialData from './initial-data'
import { Column } from './column'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

export const StateContext = createContext()

const Container = styled.div`
  display: flex;
`

const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  &:hover {
    border-color: #646cff;
  }
`

export function App() {
  const [state, setState] = useState(initialData)

  function getState() {
    fetch("http://localhost:5000/getstate").then((res) =>
      res.json().then((data) => {
        setState(data)
      })
    )
  }

  useEffect(() => {
    getState()
  }, [])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination)
      return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    // Move in same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        }
      };

      fetch("http://localhost:5000/updatestate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newState)
      })

      setState(newState)
      return
    }

    // Move between two columns
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    };

    fetch("http://localhost:5000/updatestate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newState)
    })

    setState(newState)
  }

  function newTask() {
    fetch("http://localhost:5000/addtask")
    getState()
  }

  return (
    <div>
      <Container>
        <Button onClick={newTask}>New Task</Button>
      </Container>
      <StateContext.Provider value={[state, setState]}>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Container>
            {state.columnOrder.map(columnId => {
              const column = state.columns[columnId]
              const tasks = column.taskIds.map(taskId => state.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks} />
            })}
          </Container>
        </DragDropContext>
      </StateContext.Provider>
    </div>
  )
}
