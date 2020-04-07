import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";

import ToDoCard from './ToDoCard';
import ToDoListActionButton from './ToDoListActionButton';

const ListContainer = styled.div`
    background-color: cadetblue;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
`

const ToDoList = ({ title, cards, listID, index }) => {
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <ListContainer 
                    {...provided.draggableProps} 
                    ref={provided.innerRef} 
                    {...provided.dragHandleProps}
                >
                    <Droppable droppableId={String(listID)}>
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <h4>{title}</h4>
                                { cards.map((card, index) => (
                                    <ToDoCard 
                                        key={card.id} 
                                        id={card.id} 
                                        text={card.text} 
                                        index={index}
                                    />
                                )) }
                                {provided.placeholder}
                                <ToDoListActionButton listID={listID}/>
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    );
}

export default ToDoList;