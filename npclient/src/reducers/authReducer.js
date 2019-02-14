import {SIGN_IN, SIGN_OUT, GET_TOKEN, EXPIRE_TOKEN} from "./types";

const INITIAL_STATE = {
    isSignedIn: null,
    user: null,
    authToken: null
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state , isSignedIn: true, user: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, user: null };
        case GET_TOKEN:
            return { ...state, authToken: action };
        case EXPIRE_TOKEN:
            return { ...state, authToken: null };
        default:
            return state;
    }
};