import { CONSTANTS } from './../actions';

let listID = 3;
let cardId = 8;

const initialState = [
    {
        title: "Aprovados",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "card 0"
            },
            {
                id: `card-${1}`,
                text: "card 1"
            }
        ]
    },
    {
        title: "Em andamento",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "card 0"
            },
            {
                id: `card-${3}`,
                text: "card 1"
            },
            {
                id: `card-${4}`,
                text: "card 2"
            }
        ]
    },
    {
        title: "Concluído",
        id: `list-${2}`,
        cards: [
            {
                id: `card-${5}`,
                text: "card 0"
            },
            {
                id: `card-${6}`,
                text: "card 1"
            },
            {
                id: `card-${7}`,
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
                id: `list-${listID}`
            }
            listID+=1;
            return [...state, newList];
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardId}`
            }
            cardId+=1;

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

        case CONSTANTS.DRAG_HAPPENED:
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

        default:
            return state;
    }
}

export default listsReducer;