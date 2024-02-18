import { Task } from './task'
import { Droppable } from 'react-beautiful-dnd'

export function Column(props) {
  const container = {
    margin: "8px",
    border: "1px solid lightgrey",
    borderRadius: "2px"
  }

  const title = {
    padding: "8px"
  }

  const tasklist = {
    padding: "8px"
  }

  return (
    <div style={container}>
      <h3 style={title}>{props.column.title}</h3>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <div
            style={tasklist}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
