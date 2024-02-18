export function Task(props) {
  const container = {
    border: "1px solid lightgrey",
    borderRadius: "2px",
    padding: "8px",
    marginBottom: "8px"
  }

  return (
    <div style={container}>{props.task.content}</div>
  )
}
