import { Task } from './task'

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
      <div style={tasklist}>
        {props.tasks.map(task => <Task key={task.id} task={task} />)}
      </div>
    </div>
  )
}
