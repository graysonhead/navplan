import {ADD_MESSAGE, REMOVE_MESSAGE, CLEAR_MESSAGES} from './types';
import _ from 'lodash';


export default (state=[], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [...state, action.payload];
        case REMOVE_MESSAGE:
            let new_arr = [...state];
            new_arr.splice(action.payload, 1);
            return new_arr;
        case CLEAR_MESSAGES:
            return [];
        default:
            return state;
    }
}