import { Task } from './task'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const ColumnContainer = styled.div`
    margin: 8px;
    border: 1px solid ${props => props.$done ? "grey" : "lightgrey"};
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`

const ColumnTitle = styled.h3`
    color: ${props => props.$done ? "grey" : "white"}
`

const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`

export function Column(props) {
  return (
    <ColumnContainer $done={props.column.title === "Done"}>
      <ColumnTitle $done={props.column.title === "Done"}>{props.column.title}</ColumnTitle>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} column={props.column} />)}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnContainer>
  )
}
