import _ from 'lodash';
import {
    CREATE_COORD,
    FETCH_COORD,
    FETCH_COORDS,
    EDIT_COORD,
    DELETE_COORD
} from "./types";

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_COORD:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_COORDS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_COORD:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_COORD:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_COORD:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};