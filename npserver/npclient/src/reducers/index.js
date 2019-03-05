import { combineReducers } from 'redux';
import authReducer from './authReducer';
import flightPlanReducer from './flightPlanReducer';
import coordinateReducer from './coordinateReducer';
import {reducer as formReducer} from 'redux-form';
import messageReducer from './messageReducer';

export default combineReducers({
    auth: authReducer,
    coordinates: coordinateReducer,
    flightPlans: flightPlanReducer,
    form: formReducer,
    messages: messageReducer
})