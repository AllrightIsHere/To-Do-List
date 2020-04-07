import { CONSTANTS } from './../actions';

export const addCard = (listId, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {
            text: text,
            id: listId
        }
    };
}