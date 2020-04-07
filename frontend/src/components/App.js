import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";

import ToDoList from './ToDoList';
import ToDoListActionButton from './ToDoListActionButton';
import { sort } from './../actions';

const ListContainer = styled.div`
  font-family: Quicksand, sans-serif;
  display: flex;
  flex-direction: row;
`;

class App extends Component {

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if(!destination){
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    )

  }

  render(){
    const { lists } = this.props;
  
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h1 style={{fontFamily: "Quicksand, sans-serif"}}>MVP - React</h1>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListContainer 
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                { lists.map((list, index) => (
                  <ToDoList 
                    listID={list.id} 
                    key={list.id} 
                    title={list.title} 
                    cards={list.cards}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <ToDoListActionButton list />
              </ListContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
