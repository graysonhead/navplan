import _ from 'lodash';
import {CREATE_FLIGHTPLAN} from "./types";

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_FLIGHTPLAN:
            return { ...state, [action.payload.id]: action.payload};
        default:
            return state;
    }
};