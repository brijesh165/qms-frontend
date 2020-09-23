import dashboardTypes from './actionTypes';

const initialState = {
    dashboardError: null, loading: null, downloadSurvey: [],
    questionaireData: [],
    adminQuestionaireData: [],
    userQuestionaireData: [],
    userQuestionaireData2: [],
    downloadSurveySuccess: false,
    downloadFail: false,
    downloadError: null,
    deleteQuestionnaireFail: false,
    deleteQuestionnaireError: null,
    endSurveyFail: false,
    endSurveyError: null,
}

const dashboardManagement = (state = initialState, action) => {
    switch (action.type) {
        case dashboardTypes.GET_QUESTIONAIRE_DATA_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.GET_QUESTIONAIRE_DATA_SUCCESS:
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                questionaireData: action.payload
            }
            break;
        case dashboardTypes.GET_ADMIN_QUESTIONAIRE_DATA_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.GET_ADMIN_QUESTIONAIRE_DATA_SUCCESS:
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                adminQuestionaireData: action.payload.questionare.Questions,
                userQuestionaireData: action.payload.responses.questData,
                userQuestionaireData2: action.payload.responses.respData
            }
            break;
        case dashboardTypes.GET_USER_QUESTIONAIRE_DATA_START:
            state = {
                ...state,
                loading: false,
                dashboardError: null
            }
            break;
        case dashboardTypes.GET_USER_QUESTIONAIRE_DATA_SUCCESS:
            state = {
                ...state,
                loading: true,
                dashboardError: null,
                userQuestionaireData: action.payload.questData,
                userQuestionaireData2: action.payload.respData
            }
            break;

        case dashboardTypes.DELETE_SURVEY_START:
            state = {
                ...state,
                questionnaireManagementError: null,
            }
            break;
        case dashboardTypes.DELETE_SURVEY_SUCCESS:
            console.log('DELETE SURVEY : ', action.payload);
            let prevStateQuestion = [...state.questionaireData];
            const deletedQuestions = prevStateQuestion.filter((item) => {
                return item.id !== action.payload
            });
            state = {
                ...state,
                questionnaireManagementError: null,
                questionaireData: deletedQuestions
            }
            break;
        case dashboardTypes.DELETE_SURVEY_FAIL:
            state = {
                ...state,
                deleteQuestionnaireFail: true,
                deleteQuestionnaireError: action.payload
            }
            break;

        case dashboardTypes.END_SURVEY_START:
            state = {
                ...state,
                dashboardError: null
            }
            break;
        case dashboardTypes.END_SURVEY_SUCCESS:
            let prevSurveyData = [...state.questionaireData];
            let surveyDataAfterDelete = prevSurveyData.find((item) => {
                return item.id === action.payload
            });
            let index = prevSurveyData.findIndex(item => item.id === action.payload);
            let changeStatus = { ...surveyDataAfterDelete, ...{ accept: false } };
            prevSurveyData[index] = changeStatus;

            state = {
                ...state,
                dashboardError: null,
                questionaireData: prevSurveyData
            }
            break;
        case dashboardTypes.END_SURVEY_FAIl:
            state = {
                ...state,
                endSurveyFail: true,
                endSurveyError: action.payload
            }
            break;
            
        case dashboardTypes.DOWNLOAD_SURVEY_START:
            state = {
                ...state,
            }
            break;
        case dashboardTypes.DOWNLOAD_SURVEY_SUCCESS:
            state = {
                ...state,
                downloadSurveySuccess: true,
                downloadSurvey: action.payload
            }
            break;
        case dashboardTypes.DOWNLOAD_SURVEY_FAIL:
            state = {
                ...state,
                downloadFail: true,
                downloadError: action.payload
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
            let unfilledData = [...state.userQuestionaireData];
            let updatedData = unfilledData.find((item) => item.id === action.payload.id);
            let updateindex = unfilledData.findIndex(item => item.id === action.payload);
            let changeUpdateStatus = { ...updatedData, ...{ filled: true } };
            unfilledData[updateindex] = changeUpdateStatus;

            state = {
                ...state,
                loading: true,
                dashboardError: null,
                userQuestionaireData: unfilledData
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
            let submitQuest = [...state.userQuestionaireData];
            let submitedQuest = submitQuest.find((item) => item.id === action.payload.id);
            let removeFromUserSurvey = submitQuest.filter((item) => item.id !== submitedQuest.id)
            let newUserSurveyData2 = [...state.userQuestionaireData2];
            let updatedUserSurvetData2 = [...newUserSurveyData2, action.payload];

            state = {
                ...state,
                loading: true,
                dashboardError: null,
                userQuestionaireData: removeFromUserSurvey,
                userQuestionaireData2: updatedUserSurvetData2
            }
            break;
        case dashboardTypes.API_FAILED:
            console.log('API FAIL : ', action.payload)
            state = {
                ...state,
                loading: false,
                dashboardError: action.payload
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default dashboardManagement;