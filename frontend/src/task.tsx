import { Draggable } from 'react-beautiful-dnd'

export function Task(props) {
  const container = {
    border: "1px solid lightgrey",
    borderRadius: "2px",
    padding: "8px",
    marginBottom: "8px",
    backgroundColor: "white"
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...container,
            ...provided.draggableProps.style
          }}
        >
          {props.task.content}
        </div>
      )}
    </Draggable>
  )
}
