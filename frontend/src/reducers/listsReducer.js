import { CONSTANTS } from './../actions';
import { v4 as uuid } from 'uuid';

const initialState = [
    {
        title: "Aprovados",
        id: `list-${uuid()}`,
        cards: [
            {
                id: `card-${uuid()}`,
                text: "card 0"
            },
            {
                id: `card-${uuid()}`,
                text: "card 1"
            }
        ]
    },
    {
        title: "Em andamento",
        id: `list-${uuid()}`,
        cards: [
            {
                id: `card-${uuid()}`,
                text: "card 0"
            },
            {
                id: `card-${uuid()}`,
                text: "card 1"
            },
            {
                id: `card-${uuid()}`,
                text: "card 2"
            }
        ]
    },
    {
        title: "Concluído",
        id: `list-${uuid()}`,
        cards: [
            {
                id: `card-${uuid()}`,
                text: "card 0"
            },
            {
                id: `card-${uuid()}`,
                text: "card 1"
            },
            {
                id: `card-${uuid()}`,
                text: "card 2"
            }
        ]
    }
];

const listsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${uuid()}`
            }
            return [...state, newList];
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${uuid()}`
            }

            const newState = state.map(list => {
                if(list.id === action.payload.id){
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });

            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = [...state];

            //mudar listas
            if(type === "list"){
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);

                return newState;
            }

            //mesma coluna
            if(droppableIdStart === droppableIdEnd){
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            //outra coluna
            if(droppableIdStart !== droppableIdEnd){
                const listStart = state.find(list => droppableIdStart === list.id);

                const card = listStart.cards.splice(droppableIndexStart, 1);

                const listEnd = state.find(list => droppableIdEnd === list.id);

                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }

        case CONSTANTS.DELETE_CARD: {
            const { id, listID } = action.payload;

            return state.map(list => {
                if (list.id === listID) {
                    const newCards = list.cards.filter(card => card.id !== id);
                    return { ...list, cards: newCards };
                } else {
                    return list;
                }
            });
        }

        case CONSTANTS.EDIT_CARD: {
            const { id, listID, newText } = action.payload;

            return state.map(list => {
                if(list.id === listID){
                    const newCards = list.cards.map(card => {
                        if(card.id === id) {
                            card.text = newText;
                            return card;
                        }
                        return card;
                    });
                    return { ...list, cards: newCards };
                }
                return list;
            });
        }

        case CONSTANTS.DELETE_LIST: {
            const { listID } = action.payload;

            return state.filter(list => list.id !== listID);
        }

        default:
            return state;
    }
}

export default listsReducer;