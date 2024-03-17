import { useContext } from 'preact/hooks'
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

const TaskContent = styled.div`
  font-size: 16px;
  text-align: left;
  color: ${p => p.$done ? "grey" : "white"};
  ${props => props.$done ? "text-decoration: line-through;" : ""}
`

const TaskLabel = styled.div`
  font-size: 11px;
  text-align: left;
  color: ${p => p.$done ? "grey" : "lightgrey"};
  margin-right: 3px;
`

export function Task(props) {
  const [setSelectedTask] = useContext(StateContext)

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $done={props.column.id === "Done"}
          onClick={() => setSelectedTask(props.task)}
        >
          <TaskContent $done={props.column.id === "Done"}>{props.task.content}</TaskContent>
          <TaskLabel $done={props.column.id === "Done"}>{"| " + props.task.labels.join(" ") + " |"}</TaskLabel>
        </TaskContainer>
      )}
    </Draggable>
  )
}
