import { combineReducers } from 'redux';
import authReducer from './authReducer';
import flightPlanReducer from './flightPlanReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth: authReducer,
    flightPlans: flightPlanReducer,
    form: formReducer
})