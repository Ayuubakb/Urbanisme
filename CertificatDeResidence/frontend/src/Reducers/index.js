import { combineReducers } from "redux";
import EmployeesReducer from "./EmployeesReducer";
import AuthenticationReducer from "./AuthenticationReducer";
import DemandsReducer from "./DemandsReducer";
import GeographyReducer from "./GeographyReducer";
import DemandReducer from "./DemandReducer";


export default combineReducers({
    AuthenticationReducer,
    EmployeesReducer,
    DemandsReducer,
    GeographyReducer,
    DemandReducer
})