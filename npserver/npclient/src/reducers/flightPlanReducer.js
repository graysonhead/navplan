import _ from 'lodash';
import {
    CREATE_FLIGHTPLAN,
    FETCH_FLIGHTPLANS,
    DELETE_FLIGHTPLAN,
    FETCH_FLIGHTPLAN,
    EDIT_FLIGHTPLAN
} from "./types";

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_FLIGHTPLAN:
            return { ...state, [action.payload.id]: action.payload};
        case FETCH_FLIGHTPLANS:
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_FLIGHTPLAN:
            return { ...state, [action.payload.id]: action.payload};
        case EDIT_FLIGHTPLAN:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_FLIGHTPLAN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};