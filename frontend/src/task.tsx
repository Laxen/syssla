import { useState } from 'preact/hooks'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #242424;
`

export function Task(props) {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(props.task.content)

  function startEdit() {
    setEditing(true)
  }

  function stopEdit() {
    setEditing(false)

    props.task.content = content

    fetch("http://localhost:5000/updatetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props.task)
    })
  }

  function handleChange(e) {
    setContent(e.target.value)
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={startEdit}
          onBlur={stopEdit}
        >
          {editing ? (
            <input
              type="text"
              value={content}
              autoFocus
              onChange={handleChange}
            />
          ) : (
            content
          )}
        </Container>
      )}
    </Draggable>
  )
}
