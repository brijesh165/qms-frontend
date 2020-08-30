import questionnaire from './actionTypes';

export const addquestionnairesuccessful = (question_data) => (
    console.log('Add Action : ', question_data),
    {
        type: questionnaire.ADD_QUESTIONNAIRE_SUCCESSFUL,
        payload: question_data
})

export const deletequestionnairestart = (question_data) => (
    console.log('Delete Action', question_data),
    {
        type: questionnaire.DELETE_QUESTIONNAIRE_START,
        payload: question_data
})

export const getquestionnairestart = () => {
    // console.log('GET ACTION START');
    return {
        type: questionnaire.GET_QUESTIONNAIRE_START
    }
}

export const copyquestionnairestart = (question_data) => (
    console.log('Copy Action', question_data),
    {
        type: questionnaire.COPY_QUESTIONNAIRE_START,
        payload: question_data
})

export const apiError = (error) => (
    {
        type: questionnaire.API_FAILED,
        payload: error
})