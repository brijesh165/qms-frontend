import questionnaire from './actionTypes';

const initialState = {
    questionnaireManagementError: null, loading: null, success: false, questions: []
}

const questionnaireManagement = (state = initialState, action) => {
    console.log('Reducer', action.type);
    console.log('Reducer', action.payload);
    switch (action.type) {
        case questionnaire.ADD_QUESTIONNAIRE_SUCCESSFUL:
            state = {
                ...state,
                loading: false,
                success: true,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.GET_QUESTIONNAIRE_SUCCESSFUL: 
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
                question: action.payload
            }
            break;
        case questionnaire.DELETE_QUESTIONNAIRE_SUCCESSFUL: 
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null
            }
            break;
        case questionnaire.COPY_QUESTIONNAIRE_SUCCESSFUL: 
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null
            }
            break;
        case questionnaire.API_FAILED:
            state = {
                ...state,
                loading: false,
                success: false,
                questionnaireManagementError: action.payload
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default questionnaireManagement;