import { createContext } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import initialData from './initial-data'
import { Column } from './column'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { TaskView } from './taskview'

export const StateContext = createContext()
let searchInterval = null;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const FlexContainer = styled.div`
  display: flex;
`

const Button = styled.button`
  border-radius: 2px;
  border: 1px solid lightgrey;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #242424;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-left: 8px;
  color: white;
  &:hover {
    border-color: #646cff;
  }
`

const SearchBar = styled.input`
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: #242424;
  flex: 1;
  margin-right: 8px;
  margin-left: 8px;
  color: white;
  padding: 8px;
  font-size: 1em;
`

const AppTitle = styled.h1`
  text-align: left;
  color: white;
  margin: 0px;
  padding-left: 8px;
  font-size: 50px;
`

export function App() {
  const [state, setState] = useState(initialData)
  const [selectedTask, setSelectedTask] = useState(null)
  const taskViewRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (taskViewRef.current && !taskViewRef.current.contains(event.target)) {
        setSelectedTask(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
  }, [taskViewRef])

  function getState(label="") {
    let url = "http://" + window.location.hostname + ":5000/getstate"

    if (label)
      url += "?label=" + label

    fetch(url).then((res) =>
      res.json().then((data) => {
        setState(data)
      })
    )
  }

  useEffect(() => {
    getState()
  }, [])

  function onDragEnd(result) {
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

    let newState

    if (start === finish) {
      // Move in same column
      const newTaskIds = start.taskIds.filter((_, i) => i != source.index)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        }
      };

      fetch("http://" + window.location.hostname + ":5000/movetask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "taskId": draggableId,
          "startCol": source.droppableId,
          "endCol": destination.droppableId,
          "startIndex": source.index,
          "endIndex": destination.index
        })
      })
    } else {
      // Move between two columns
      const startTaskIds = start.taskIds.filter((_, i) => i != source.index)
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

      newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        }
      };

      fetch("http://" + window.location.hostname + ":5000/movetask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "taskId": draggableId,
          "startCol": source.droppableId,
          "endCol": destination.droppableId,
          "startIndex": source.index,
          "endIndex": destination.index
        })
      })
    }

    setState(newState)
  }

  function newTask() {
    const taskCounter = state["taskCounter"]

    fetch("http://" + window.location.hostname + ":5000/addtask")
    getState()

    setSelectedTask(state.tasks["task-" + taskCounter])
  }

  function handleSearch(e) {
    clearTimeout(searchInterval)
    searchInterval = setTimeout(() => {
      getState(e.target.value)
    }, 250)
  }

  return (
    <AppContainer>
      <AppTitle>SYSSLA</AppTitle>
      <FlexContainer>
        <Button onClick={newTask}>New Task</Button>
        <SearchBar
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
      </FlexContainer>
      <StateContext.Provider value={[setSelectedTask]}>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <FlexContainer>
            {state.columnOrder.map(columnId => {
              const column = state.columns[columnId]
              const tasks = column.taskIds.map(taskId => state.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks} />
            })}
          </FlexContainer>
        </DragDropContext>
      </StateContext.Provider>
      {selectedTask != null && (
        <div ref={taskViewRef}> { /* Wrap TaskView in div to get ref to work properly */ }
          <TaskView task={selectedTask} />
        </div>
      )}
    </AppContainer>
  )
}
