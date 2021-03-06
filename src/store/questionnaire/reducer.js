import questionnaire from './actionTypes';

const initialState = {
    questionnaireManagementError: null, loading: null, questions: [],
    getQuestionnaireFail: false,
    getQuestionnaireError: null,
    addQuestionnaireFail: false,
    addQuestionnaireError: null,
    deleteQuestionnaireFail: false,
    deleteQuestionnaireError: null,
    reeditQuestionnaireFail: false,
    reeditQuestionnaireError: null,
    copyQuestionnaireFail: false,
    copyQuestionnaireError: null
}

const questionnaireManagement = (state = initialState, action) => {
    // console.log('Reducer', action.type);
    // console.log('Reducer', action.payload);
    switch (action.type) {
        case questionnaire.GET_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.GET_QUESTIONNAIRE_SUCCESSFUL:
            const allQuestions = [];
            for (let i = 0; i < action.payload.length; i++) {
                let newObj = {
                    "id": action.payload[i].id,
                    "questions": action.payload[i].questions,
                    "questname": action.payload[i].questname,
                    "createdAt": action.payload[i].createdAt,
                    "questmessage": action.payload[i].questmessage
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
        case questionnaire.GET_QUESTIONNAIRE_FAIL:
            state = {
                ...state,
                getQuestionnaireFail: true,
                getQuestionnaireError: action.payload
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
        case questionnaire.ADD_QUESTIONNAIRE_FAIL:
            state = {
                ...state,
                addQuestionnaireFail: true,
                addQuestionnaireError: action.payload
            }
            break;

        case questionnaire.REEDIT_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
            }
            break;
        case questionnaire.REEDIT_QUESTIONNAIRE_SUCCESSFUL:
            let prevQuestionss = [...state.questions];
            const resp = [];
            resp.push(action.payload.questions);
            // const mapedQuestion = prevQuestionss.map(obj => resp.find(o => o.id === obj.id) || obj);
            const foundIndex = prevQuestionss.findIndex(x => x.id === action.payload.questions.questid);
            prevQuestionss[foundIndex].questname = action.payload.questions.questname;
            prevQuestionss[foundIndex].questions = action.payload.questions.questdata;
            state = {
                ...state,
                questions: prevQuestionss
            }
            break;
        case questionnaire.REEDIT_QUESTIONNAIRE_FAIL:
            state = {
                ...state,
                reeditQuestionnaireFail: true,
                reeditQuestionnaireError: action.payload
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
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
                questions: deletedQuestions
            }
            break;
        case questionnaire.DELETE_QUESTIONNAIRE_FAIL:
            state = {
                ...state,
                deleteQuestionnaireFail: true,
                deleteQuestionnaireError: action.payload
            }
            break;
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
        case questionnaire.COPY_QUESTIONNAIRE_START:
            state = {
                ...state,
                loading: false,
                questionnaireManagementError: null,
            }
            break;
        case questionnaire.COPY_QUESTIONNAIRE_SUCCESSFUL:
            const copyPrevQuestions = [...state.questions];
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