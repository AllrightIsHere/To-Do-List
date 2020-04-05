import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';

import './styles.css';

export default function ToDoList() {
    const itemsFrontBackend = [
        { id: uuid(), content: 'Frist task' },
        { id: uuid(), content: 'Second task' }
    ];
      
    const columnsFrontBackend =
        {
          [uuid()]: {
            name: 'Todo',
            items: itemsFrontBackend
          },
          [uuid()]: {
            name: 'In Progress',
            items: []
          }
        };
      
    const onDragEnd = (result, columns, setColumns) => {
        if(!result.destination) return;
      
        const { source, destination } = result;
      
        if(source.droppableId !== destination.droppableId){//coluna diferente
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
      
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
      
          const [removed] = sourceItems.splice(source.index, 1);
          
          destItems.splice(destination.index, 0, removed);
      
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          })
        }else{ //mesma coluna
          const column = columns[source.droppableId];
        
          const copiedItems = [...column.items];
        
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems
            }
          })
        }
      
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        padding: 16,
        margin: '0 0 8px 0',
        minHeight: '50px',
        backgroundColor: isDragging ? '#263b4a' : '#456c86',
        color: 'white',
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: 4,
        width: 250,
        minHeight: 500
    })
    
    const [columns, setColumns] = useState(columnsFrontBackend);

    return (
        <div className="to-do-list-container">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([id, column]) => {
            return (
                <div className="column">
                <h2>{column.name}</h2>
                <div className="item">
                    <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                        return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {column.items.map((item, index) => {
                                return (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => {
                                    return (
                                        <div ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                        {item.content}
                                        </div>
                                    )
                                    }}
                                </Draggable>
                                )
                            })}
                            {provided.placeholder}
                            </div>
                        )
                    }}
                    </Droppable>
                </div>
                </div>
            )
            })}
        </DragDropContext>
        </div>
    );
}