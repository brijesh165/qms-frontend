import dashboardTypes from './actionTypes';

const initialState = {
    dashboardError: null, loading: null, downloadSurvey: [],
    surveyData: [],
    adminSurveyData: [],
    userSurveyData: [],
    userSurveyData2: []
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
        case dashboardTypes.GET_ADMIN_SURVEY_DATA_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.GET_ADMIN_SURVEY_DATA_SUCCESS:
            console.log('GET ADMIN SUCCESS : ', action.payload);
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                adminSurveyData: action.payload.table1,
                userSurveyData: action.payload.table2,
                userSurveyData2: action.payload.respData
            }
            break;
        case dashboardTypes.GET_USER_SURVEY_DATA_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.GET_USER_SURVEY_DATA_SUCCESS:
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                userSurveyData: action.payload.questData,
                userSurveyData2: action.payload.respData
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
            let changeStatus = { ...surveyDataAfterDelete, ...{ accept: false } };
            prevSurveyData[index] = changeStatus;

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

        case dashboardTypes.FILL_QUESTION_START: 
            state = {
                ...state,
                loading: false,
                dashboardError: null,
            }
            break;
        case dashboardTypes.FILL_QUESTION_SUCCESS:
            let unfilledData = [...state.userSurveyData];
            let updatedData = unfilledData.find((item) => item.id === action.payload.id);
            let updateindex = unfilledData.findIndex(item => item.id === action.payload);
            let changeUpdateStatus = { ...updatedData, ...{ filled: true } };
            unfilledData[updateindex] = changeUpdateStatus;

            state = {
                ...state,
                loading: true,
                dashboardError: null,
                userSurveyData: unfilledData
            }
            break;

        case dashboardTypes.SUBMIT_QUESTION_START: 
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.SUBMIT_QUESTION_SUCCESS:
            let submitQuest = [...state.userSurveyData];
            let submitedQuest = submitQuest.find((item) => item.id === action.payload.id);
            let removeFromUserSurvey = submitQuest.filter((item) => item.id !== submitedQuest.id)
            let newUserSurveyData2 = [...state.userSurveyData2];
            let updatedUserSurvetData2 = [...newUserSurveyData2, action.payload];

            state = {
                ...state,
                loading: true,
                dashboardError: null,
                userSurveyData: removeFromUserSurvey,
                userSurveyData2: updatedUserSurvetData2
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