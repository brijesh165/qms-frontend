import questionnaire from './actionTypes';

export const getQuestionnaireStart = (token) => {
    return {
        type: questionnaire.GET_QUESTIONNAIRE_START,
        payload: token
    }
}
export const addQuestionnaireStart = (question_data, token) => (
    {
        type: questionnaire.ADD_QUESTIONNAIRE_START,
        payload: {question_data, token}
})

export const copyQuestionnaireStart = (question_data, token) => (
    {
        type: questionnaire.COPY_QUESTIONNAIRE_START,
        payload: {question_data, token}
})

export const reeditQuestionnaireStart = (question_data, token) => (
    {
        type: questionnaire.REEDIT_QUESTIONNAIRE_START,
        payload: {question_data, token}
    }
)

export const deleteQuestionnaireStart = (question_data, token) => (
    {
        type: questionnaire.DELETE_QUESTIONNAIRE_START,
        payload: {question_data, token}
})

export const apiError = (error) => (
    {
        type: questionnaire.API_FAILED,
        payload: error
})