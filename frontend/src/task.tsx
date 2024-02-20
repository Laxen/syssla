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

  const startEdit = () => {
    setEditing(true)
  }

  const stopEdit = () => {
    setEditing(false)
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
              value={props.task.content}
              autofocus
            />
          ) : (
            props.task.content
          )}
        </Container>
      )}
    </Draggable>
  )
}
