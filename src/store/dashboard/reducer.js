import dashboardTypes from './actionTypes';

const initialState = {
    dashboardError: null, loading: null, surveyData: [], downloadSurvey: []
}

const dashboardManagement = (state = initialState, action) => {
    console.log('Reducer', action.type);
    console.log('Reducer', action.payload);
    switch (action.type) {
        case dashboardTypes.GET_SURVEY_DATA_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.GET_SURVEY_DATA_SUCCESS:
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                surveyData: action.payload
            }
            break;
        case dashboardTypes.END_SURVEY_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.END_SURVEY_SUCCESS:
            let prevSurveyData = [...state.surveyData];
            let surveyDataAfterDelete = prevSurveyData.find((item) => {
                return item.id === action.payload
            });
            let index = prevSurveyData.findIndex(item => item.id === action.payload);
            let changeStatus = {...surveyDataAfterDelete, ...{accept: false}};
            prevSurveyData[index] = changeStatus;
            console.log('Survey After Delete : ', prevSurveyData);
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                surveyData: prevSurveyData
            }
            break;
        case dashboardTypes.DOWNLOAD_SURVEY_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.DOWNLOAD_SURVEY_SUCCESS:
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                downloadSurvey: action.payload
            }
            break;
        case dashboardTypes.API_FAILED:
            state = {
                ...state,
                loading: false,
                userManagementError: action.payload
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default dashboardManagement;