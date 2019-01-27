import navplan from '../apis/navplan';
import {TEMPORARY_TESTING_UID} from '../index';
import {CREATE_FLIGHTPLAN, SIGN_OUT, SIGN_IN} from "../reducers/types";


export const createFlightPlan = formValues => async (dispatch, getState) => {
    const uid = TEMPORARY_TESTING_UID;
    const response = await navplan.post('/flightplans', { ...formValues, owner_id: uid });
    dispatch({ type: CREATE_FLIGHTPLAN, payload: response.data});
};