import { useState, useRef, useEffect, useContext } from 'preact/hooks'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { StateContext } from './app'

const TaskContainer = styled.div`
  display: flex;
  border: 1px solid ${p => p.$done ? "grey" : "lightgrey"};
  border-radius: 2px;
  padding: 8px;
  margin-top: 8px;
  background-color: #242424;
  flex-direction: column;
`

const TaskTitle = styled.div`
  color: ${p => p.$done ? "grey" : "white"};
  ${props => props.$done ? "text-decoration: line-through;" : ""}
  text-align: left;
`

const LabelContainer = styled.div`
  display: flex;
`

const Label = styled.div`
  color: ${p => p.$done ? "grey" : "lightgrey"};
  margin-right: 3px;
  font-size: 10px;
`

export function Task(props) {
  const [state, setState] = useContext(StateContext)
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(props.task.content)
  const inputRef = useRef()

  useEffect(() => {
    if (editing)
      inputRef.current?.focus()
  }, [editing])

  function startEdit() {
    setEditing(true)
  }

  function stopEdit() {
    setEditing(false)

    props.task.content = content

    fetch("http://" + window.location.hostname + ":5000/updatetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "task": props.task,
        "column": props.column.id
      })
    })

    if (content == "") {
      const newTaskIds = props.column.taskIds.filter(e => e != props.task.id)
      const newColumn = {
        ...props.column,
        taskIds: newTaskIds,
      }
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [props.column.id]: newColumn,
        }
      }

      setState(newState)
    }
  }

  function handleChange(e) {
    setContent(e.target.value)
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      inputRef.current.blur()
    }
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={startEdit}
          onBlur={stopEdit}
          $done={props.column.id === "Done"}
        >
          {editing ? (
            <input
              type="text"
              value={content}
              onChange={handleChange}
              ref={inputRef}
              onKeyPress={handleKeyPress}
            />
          ) : (
            <div>
              <TaskTitle $done={props.column.id === "Done"}>{content}</TaskTitle>
              <LabelContainer>
                {props.task.labels.map(label => {
                  return <Label $done={props.column.id === "Done"}>{label}</Label>
                })}
              </LabelContainer>
            </div>
          )}
        </TaskContainer>
      )}
    </Draggable>
  )
}
