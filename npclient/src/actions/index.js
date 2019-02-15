import navplan from '../apis/navplan';
import {TEMPORARY_TESTING_UID} from '../index';
import arrayMove from 'array-move';
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
    EDIT_COORD, DELETE_COORD
} from "../reducers/types";
import history from "../history";
const uid = TEMPORARY_TESTING_UID;

export const logInUser = (formValues) => async dispatch => {
    const auth_object = {
      username: formValues.email,
      password: formValues.password};
    console.log(auth_object);
    const response = await navplan.get('/auth/currentuser', {auth: auth_object});
    dispatch({ type: SIGN_IN, payload: response.data});

    const token_resp = await navplan.get('/auth/token', {auth: auth_object});
    dispatch({ type: GET_TOKEN, payload: token_resp.data.token});
};

export const createFlightPlan = (formValues, redirectUrl) => async dispatch => {
    const response = await navplan.post('/flightplans', { ...formValues, owner_id: uid });
    dispatch({ type: CREATE_FLIGHTPLAN, payload: response.data});
    if (redirectUrl) {
        history.push(redirectUrl);
    }
};

export const fetchFlightPlans = () => async dispatch => {
    const response = await navplan.get(`/flightplans?search={"name":"owner_id","op":"eq","val":"${uid}"}`);

    dispatch({ type: FETCH_FLIGHTPLANS, payload: response.data.objects });
};

export const fetchFlightPlan = (id) => async dispatch => {
    const response = await navplan.get(`/flightplans/${id}`);

    dispatch({ type: FETCH_FLIGHTPLAN, payload: response.data});
    console.log(response.data);
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

export const deleteFlightPlan = (id, redirectUrl) => async dispatch => {
    await navplan.delete(`/flightplans/${id}`);

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

export const fetchDelCoordsFromFlightPlan = (flightplan_id) => async dispatch => {
    const response = await navplan.get(`/coordinates?search={"name":"fp_steerpoint_id","op":"eq","val":"${flightplan_id}"}`);

    dispatch({ type: FETCH_DELETE_COORDS, payload: response.data.objects });
};

export const reorderSteerpoint = (coord, new_pos, steerpoint_array) => async dispatch => {
    let new_array = arrayMove(steerpoint_array, steerpoint_array.indexOf(coord), new_pos);
    new_array.map(async steerpoint => {
        steerpoint.order = new_array.indexOf(steerpoint);
        const response = await navplan.patch(`/coordinates/${steerpoint.id}`, { ...steerpoint });
        dispatch({ type: EDIT_COORD, payload: response});
    });

};

export const createSteerpoint = (coordinatedict, flightplan_id, redirectUrl) => async dispatch => {
    const response = await navplan.post('/coordinates', { ...coordinatedict, fp_steerpoint_id: flightplan_id, steerpoint_type: "stpt" });
    dispatch({ type: CREATE_COORD, payload: response.data});
    if (redirectUrl) {
        history.push(redirectUrl);
    }
};

export const editCoordinate = (coord_id, data) => async dispatch => {
    const response = await navplan.patch(`/coordinates/${coord_id}`, { ...data });

    dispatch({ type: EDIT_COORD, payload: response.data })
};

export const deleteCoordinate = (id, go_back) => async dispatch => {
    await navplan.delete(`/coordinates/${id}`);

    dispatch({ type: DELETE_COORD, payload: id});
    if (go_back) {
        history.goBack();
    }
};

