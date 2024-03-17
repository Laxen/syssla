import styled from 'styled-components'

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
  return (
    <TaskViewContainer>
      <TaskViewTitle>Edit Task</TaskViewTitle>
      <TaskFieldContainer>
        <TaskLabel>Title:</TaskLabel>
        <TaskInput value={props.task.content} />
      </TaskFieldContainer>
      <TaskFieldContainer>
        <TaskLabel>Labels:</TaskLabel>
        <TaskInput value={props.task.labels.join(" ")} />
      </TaskFieldContainer>
    </TaskViewContainer>
  )
}
