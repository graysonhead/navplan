import navplan from '../apis/navplan';
import {TEMPORARY_TESTING_UID} from '../index';
import {
    CREATE_FLIGHTPLAN,
    SIGN_OUT,
    SIGN_IN,
    FETCH_FLIGHTPLANS,
    DELETE_FLIGHTPLAN,
    EDIT_FLIGHTPLAN,
    FETCH_FLIGHTPLAN
} from "../reducers/types";
import history from "../history";

    const uid = TEMPORARY_TESTING_UID;


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
    await navplan.get(`/flightplans/${id}`);

    dispatch({ type: FETCH_FLIGHTPLAN, payload: response.data});
};

export const deleteFlightPlan = (id, redirectUrl) => async dispatch => {
    await navplan.delete(`/flightplans/${id}`);

    dispatch({ type: DELETE_FLIGHTPLAN, payload: id});
    if (redirectUrl) {
            history.push(redirectUrl);
    }
};