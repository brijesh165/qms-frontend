import dashboardTypes from './actionTypes';

const initialState = {
    dashboardError: null, loading: null, surveyData: []
}

const dashboardManagement = (state = initialState, action) => {
    console.log('Reducer', action.type);
    console.log('Reducer', action.payload);
    switch (action.type) {
        case dashboardTypes.GET_SURVEY_DATA_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null,
            }
            break;
        case dashboardTypes.GET_SURVEY_DATA_SUCCESS: 
            state = {
                ...state,
                loading: false,
                dashboardError: null,
                surveyData: action.payload
            }
        default:
                state = { ...state };
                break;
        }
        return state;
    }
    
    export default dashboardManagement;