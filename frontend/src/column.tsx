import { Task } from './task'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    padding: 8px;
`

const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`

export function Column(props) {
  return (
    <Container>
      <Title>{props.column.title}</Title>
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
    </Container>
  )
}
