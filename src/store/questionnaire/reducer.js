import questionnaire from './actionTypes';

const initialState = {
    questionnaireManagementError: null, loading: null, questions: [],
    addQuestionSuccess: false
}

const questionnaireManagement = (state = initialState, action) => {
    console.log('Reducer', action.type);
    console.log('Reducer', action.payload);
    switch (action.type) {
        case questionnaire.SEARCH_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.SEARCH_QUESTIONNAIRE_SUCCESSFUL:
            const searchQuestions = [...state.questions];
            const searchQuestion = [...searchQuestions, action.payload];
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
                questions: searchQuestion
            }
            break;
        case questionnaire.GET_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.GET_QUESTIONNAIRE_SUCCESSFUL:
            console.log('GET REQ : ', action.payload);
            const allQuestions = [];
            for (let i = 0; i < action.payload.length; i++) {
                let newObj = {
                    "id": action.payload[i].id,
                    "questions": action.payload[i].questions,
                    "questname": action.payload[i].questname,
                    "createdAt": action.payload[i].createdAt
                }
                allQuestions.push(newObj);
            }
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
                questions: allQuestions
            }
            break;
        case questionnaire.ADD_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
                addQuestionSuccess: false,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.ADD_QUESTIONNAIRE_SUCCESSFUL:
            let prevQuestions = [...state.questions];
            const addQuestion = [...prevQuestions, action.payload];
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
                addQuestionSuccess: true,
                questions: addQuestion
            }
            break;
        case questionnaire.DELETE_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.DELETE_QUESTIONNAIRE_SUCCESSFUL:
            let prevStateQuestion = [...state.questions];
            const deletedQuestions = prevStateQuestion.filter((item) => {
                return item.id !== action.payload
            });
            console.log('DELETE SUCCESS : ', deletedQuestions);
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
                questions: deletedQuestions
            }
            break;
        case questionnaire.COPY_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.COPY_QUESTIONNAIRE_SUCCESSFUL:
            const copyPrevQuestions = [...state.questions];
            console.log('Previous Questions', copyPrevQuestions);
            const copyQuestion = [...copyPrevQuestions, action.payload];
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
                questions: copyQuestion
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