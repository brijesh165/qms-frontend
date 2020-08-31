import questionnaire from './actionTypes';

export const searchquestionnairestrart = (questname) => (
    console.log('Search Action : ', questname),
    {
        type: questionnaire.SEARCH_QUESTIONNAIRE_START,
        payload: questname
})

export const addquestionnairestrart = (question_data) => (
    {
        type: questionnaire.ADD_QUESTIONNAIRE_START,
        payload: question_data
})

export const reeditquestionnairestart = (question_data) => (
    {
        type: questionnaire.REEDIT_QUESTIONNAIRE_START,
        payload: question_data
    }
)

export const deletequestionnairestart = (question_data) => (
    {
        type: questionnaire.DELETE_QUESTIONNAIRE_START,
        payload: question_data
})

export const getquestionnairestart = () => {
    return {
        type: questionnaire.GET_QUESTIONNAIRE_START
    }
}

export const copyquestionnairestart = (question_data) => (
    {
        type: questionnaire.COPY_QUESTIONNAIRE_START,
        payload: question_data
})

export const apiError = (error) => (
    {
        type: questionnaire.API_FAILED,
        payload: error
})