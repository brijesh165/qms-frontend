import questionnaire from './actionTypes';

export const addquestionnairesuccessful = (question_data) => (
    console.log('Add Action : ', question_data),
    {
        type: questionnaire.ADD_QUESTIONNAIRE_SUCCESSFUL,
        payload: question_data
})

export const deletequestionnairesuccessful = (id) => (
    console.log('Delete Action', id),
    {
        type: questionnaire.DELETE_QUESTIONNAIRE_SUCCESSFUL,
        payload: id
})

export const getquestionnairesuccessful = () => (
    console.log('GET Action'),
    {
        type: questionnaire.GET_QUESTIONNAIRE_SUCCESSFUL,
})

export const copyquestionnairesuccessful = (question_data) => (
    console.log('Copy Action', question_data),
    {
        type: questionnaire.COPY_QUESTIONNAIRE_SUCCESSFUL,
        payload: question_data
})

export const apiError = (error) => (
    {
        type: questionnaire.API_FAILED,
        payload: error
})