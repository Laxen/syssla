import styled from 'styled-components'
import { useState } from 'preact/hooks'

const TaskViewContainer = styled.div`
  border: 1px solid lightgrey;
  position: fixed;
  top: 0;
  left: 0;
  margin-left: 30%;
  margin-top: 9%;
  width: 40%;
  background-color: #242424;
  padding: 10px;
`

const TaskViewTitle = styled.h1`
  text-align: left;
  color: white;
  margin: 0px;
  font-size: 30px;
`

const TaskFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
`

const TaskLabel = styled.div`
  font-size: 16px;
  text-align: left;
  color: white;
`

const TaskInput = styled.input`
  border: 1px solid #242424;
  border-radius: 2px;
  font-size: 16px;
  color: white;
  background-color: #242424;
  width: calc(100% - 8px);
  margin-left: 3px;
`

export function TaskView(props) {
  const [content, setContent] = useState(props.task.content)
  const [labels, setLabels] = useState(props.task.labels)
  const [description, setDescription] = useState(props.task.description)

  function updateTask(event) {
    props.task.content = content
    props.task.labels = labels
    props.task.description = description

    fetch("http://" + window.location.hostname + ":5000/updatetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "task": props.task,
        "column": null
      })
    })
  }

  return (
    <TaskViewContainer
      onBlur={updateTask}
    >
      <TaskViewTitle>Edit Task</TaskViewTitle>
      <TaskFieldContainer>
        <TaskLabel>Title:</TaskLabel>
        <TaskInput
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </TaskFieldContainer>
      <TaskFieldContainer>
        <TaskLabel>Labels:</TaskLabel>
        <TaskInput
          value={labels.join(" ")}
          onChange={(e) => setLabels(e.target.value.split(" "))}
        />
      </TaskFieldContainer>
      <TaskInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </TaskViewContainer>
  )
}
