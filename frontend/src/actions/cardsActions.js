import { CONSTANTS } from './../actions';

export const addCard = (listId, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {
            text: text,
            id: listId
        }
    };
};

export const editCard = (id, listID, newText) => {
    return {
      type: CONSTANTS.EDIT_CARD,
      payload: { id, listID, newText }
    };
};

export const deleteCard = (id, listID) => {
    return {
      type: CONSTANTS.DELETE_CARD,
      payload: { id, listID }
    };
};