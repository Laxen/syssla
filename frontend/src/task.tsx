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
  font-size: 11px;
`

export function Task(props) {
  const [state, setState] = useContext(StateContext)

  const [editContent, setEditContent] = useState(false)
  const [content, setContent] = useState(props.task.content)

  const [editLabels, setEditLabels] = useState(false)
  const [labels, setLabels] = useState(props.task.labels)

  const inputRef = useRef()

  useEffect(() => {
    if (editContent || editLabels)
      inputRef.current?.focus()
  }, [editContent, editLabels])

  function startEdit() {
    setEditContent(true)
  }

  function stopEdit() {
    setEditContent(false)
    setEditLabels(false)

    props.task.content = content
    props.task.labels = labels

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

  function handleChangeContent(e) {
    setContent(e.target.value)
  }

  function handleChangeLabels(e) {
    setLabels(e.target.value.split(" "))
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
          onBlur={stopEdit}
          $done={props.column.id === "Done"}
        >
          <div>
            {editContent ? (
              <input
                type="text"
                value={content}
                onChange={handleChangeContent}
                ref={inputRef}
                onKeyPress={handleKeyPress}
              />
            ) : (
              <TaskTitle onClick={startEdit} $done={props.column.id === "Done"}>{content}</TaskTitle>
            )}
            <LabelContainer>
              {editLabels ? (
                <input
                  type="text"
                  value={labels.join(" ")}
                  onChange={handleChangeLabels}
                  ref={inputRef}
                  onKeyPress={handleKeyPress}
                />
              ) : (
                <Label onClick={() => {setEditLabels(true)}} $done={props.column.id === "Done"}>{"| " + labels.join(" ") + " |"}</Label>
              )}
            </LabelContainer>
          </div>
        </TaskContainer>
      )}
    </Draggable>
  )
}
