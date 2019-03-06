import navplan from '../apis/navplan';
import {npclass} from '../apis/navplan';
import arrayMove from 'array-move';
import Cookies from 'js-cookie';
import {
    CREATE_FLIGHTPLAN,
    SIGN_OUT,
    SIGN_IN,
    GET_TOKEN,
    FETCH_FLIGHTPLANS,
    DELETE_FLIGHTPLAN,
    EDIT_FLIGHTPLAN,
    FETCH_FLIGHTPLAN,
    CREATE_COORD,
    FETCH_COORD,
    FETCH_DELETE_COORDS,
    FETCH_COORDS,
    EDIT_COORD, DELETE_COORD,
    ADD_MESSAGE,
    REMOVE_MESSAGE,
    CLEAR_MESSAGES
} from "../reducers/types";
import history from "../history";
export var CURRENT_UID = null;

const getAuthHeaders = (authObj) => {
    if (authObj.isSignedIn) {
        return { Authorization: authObj.authToken }
    } else {
        return {}
    }
};


export const logInUser = (formValues) => async (dispatch, getState) => {
    const auth_object = {
      username: formValues.email,
      password: formValues.password};
    const response = await navplan.post('/auth/login', auth_object);
    dispatch({ type: SIGN_IN, payload: response.data});
    const token_resp = await navplan.post('/auth/token', auth_object);
    Cookies.set('token', token_resp.data.token, { path: '', expires: 1 });
    CURRENT_UID = response.data.id;
    dispatch({ type: GET_TOKEN, payload: token_resp.data.token});
    if (response.status === 200) {
        dispatch({ type: ADD_MESSAGE, payload: {text: "You have logged in", emphasis: 'positive', title: "Logged in"}})
    }
};

export const logInWithCookie = (token) => async dispatch => {
    const auth_object ={
        username: token,
        password: 'unused'
    };
    const response = await navplan.get('/auth/currentuser', {auth: auth_object});
    dispatch({ type: SIGN_IN, payload: response.data });
};

export const logOutUser = (redirectUrl) => dispatch => {
    dispatch({ type: SIGN_OUT, payload: null});
    Cookies.remove('token', { path: ''});
    api = client(null);
    if (redirectUrl) {
        history.push(redirectUrl);
    }
};

export const createFlightPlan = (formValues, token, redirectUrl) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);
    const response = await navplan.post('/flightplans', { ...formValues}, { headers: { ...auth_headers } });
    dispatch({ type: CREATE_FLIGHTPLAN, payload: response.data});
    if (redirectUrl) {
        history.push(redirectUrl);
    }
};

export const fetchFlightPlans = (uid) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);
    const response = await navplan.get(
        `/flightplans?q={"filters":[{"name":"owner_id","op":"eq","val":"${uid}"}]}`,
        { headers: { ...auth_headers } }
        );

    dispatch({ type: FETCH_FLIGHTPLANS, payload: response.data.objects });
};

export const fetchFlightPlan = (id) => async dispatch => {
    const response = await navplan.get(`/flightplans/${id}`);

    dispatch({ type: FETCH_FLIGHTPLAN, payload: response.data});
    const { steerpoints, markpoints } = response.data;
    if (steerpoints) {
        steerpoints.map(steerpoint => {
            dispatch({ type: FETCH_COORD, payload: steerpoint});
        })
    }
    if (markpoints) {
        markpoints.map(markpoint => {
            dispatch({ type: FETCH_COORD, payload: markpoint});
        })
    }
};

export const deleteFlightPlan = (id, redirectUrl) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);

    await navplan.delete(`/flightplans/${id}`, { headers: { ...auth_headers } });

    dispatch({ type: DELETE_FLIGHTPLAN, payload: id});
    if (redirectUrl) {
            history.push(redirectUrl);
    }
};

export const fetchCoord = (id) => async dispatch => {
    const response = await navplan.get(`/coordinates/${id}`);

    dispatch({ type: FETCH_COORD, payload: response });
};

export const fetchCoordsFromFlightPlan = (flightplan_id) => async dispatch => {
    const response = await navplan.get(`/coordinates?search={"name":"fp_steerpoint_id","op":"eq","val":"${flightplan_id}"}`);

    dispatch({ type: FETCH_COORDS, payload: response.data.objects });
};

export const fetchDelCoordsFromFlightPlan = (flightplan_id) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);
    const response = await navplan.get(`/coordinates?search={"name":"fp_steerpoint_id","op":"eq","val":"${flightplan_id}"}`,
        { headers: { ...auth_headers } });

    dispatch({ type: FETCH_DELETE_COORDS, payload: response.data.objects });
};

export const reorderSteerpoint = (coord, new_pos, steerpoint_array) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);
    let new_array = arrayMove(steerpoint_array, steerpoint_array.indexOf(coord), new_pos);
    new_array.map(async steerpoint => {
        steerpoint.order = new_array.indexOf(steerpoint);
        const response = await navplan.patch(`/coordinates/${steerpoint.id}`,
            { ...steerpoint },
            {headers: { ...auth_headers }});
        dispatch({ type: EDIT_COORD, payload: response});
    });
};

export const createSteerpoint = (coordinatedict, flightplan_id, redirectUrl) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);
    const response = await navplan.post('/coordinates',
        { ...coordinatedict, fp_steerpoint_id: flightplan_id, steerpoint_type: "stpt" },
        { headers: { ...auth_headers } }
        );
    dispatch({ type: CREATE_COORD, payload: response.data});
    if (redirectUrl) {
        history.push(redirectUrl);
    }
};

export const editCoordinate = (coord_id, data) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);
    const response = await navplan.patch(`/coordinates/${coord_id}`,
        { ...data },
        { headers: { ...auth_headers } });

    dispatch({ type: EDIT_COORD, payload: response.data })
};

export const deleteCoordinate = (id, go_back) => async (dispatch, getState) => {
    const {auth} = getState();
    const auth_headers = getAuthHeaders(auth);
    await navplan.delete(`/coordinates/${id}`,
        { headers: { ...auth_headers } });

    dispatch({ type: DELETE_COORD, payload: id});
    if (go_back) {
        history.goBack();
    }
};

export const dismissMessage = (index) => async dispatch => {
  dispatch({ type: REMOVE_MESSAGE, payload: index });
};

export const dismissAllMessages = () => async dispatch => {
    dispatch({ type: CLEAR_MESSAGES});
};

