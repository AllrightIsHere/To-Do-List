import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from '@material-ui/core/Icon';
import styled from "styled-components";
import { connect } from 'react-redux';

import { editTitle, deleteList } from './../actions';
import ToDoCard from './ToDoCard';
import ToDoCreate from './ToDoCreate';

const ListContainer = styled.div`
  background-color: cadetblue;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #5C73F2;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const ToDoList = ({ title, cards, listID, index, dispatch }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [listTitle, setListTitle] = useState(title);

    const renderEditInput = () => {
        return (
            <form
                onSubmit={handleFinishEditing}
            >

                <StyledInput
                  type="text"
                  value={listTitle}
                  onChange={handleChange}
                  autoFocus
                  onFocus={handleFocus}
                  onBlur={handleFinishEditing}
                />
            </form>
        );
    };

    const handleFocus = e => {
        e.target.select();
    };

    const handleChange = e => {
        e.preventDefault();
        setListTitle(e.target.value);
    };

    const handleFinishEditing = e => {
        setIsEditing(false);
        dispatch(editTitle(listID, listTitle));
    };

    const handleDeleteList = () => {
        dispatch(deleteList(listID));
    };

    return (
        <Draggable draggableId={String(listID)} index={index}>
        {provided => (
            <ListContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
            <Droppable droppableId={String(listID)} type="card">
                {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {isEditing ? (
                        renderEditInput()
                    ): (
                    <TitleContainer 
                        onClick={() => setIsEditing(true)}
                    >
                        <ListTitle>{listTitle}</ListTitle>
                        <DeleteButton
                            onClick={handleDeleteList}
                        >
                            delete
                        </DeleteButton>
                    </TitleContainer>
                    )}
                    {cards.map((card, index) => (
                    <ToDoCard
                        key={card.id}
                        text={card.text}
                        id={card.id}
                        index={index}
                        listID={listID}
                    />
                    ))}
                    {provided.placeholder}
                    <ToDoCreate listID={listID} />
                </div>
                )}
            </Droppable>
            </ListContainer>
        )}
        </Draggable>
    );
};

export default connect()(ToDoList);