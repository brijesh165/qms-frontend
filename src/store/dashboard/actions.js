import dashboardTypes from './actionTypes';

export const getQuestionaireStart = (token) => (
    {
        type: dashboardTypes.GET_QUESTIONAIRE_DATA_START,
        payload: token
    }
)

export const getAdminQuestionaireStart = (token) => (
    {
        type: dashboardTypes.GET_ADMIN_QUESTIONAIRE_DATA_START,
        payload: token
    }
)

export const getUserQuestionaireStart = (token) => (
    {
        type: dashboardTypes.GET_USER_QUESTIONAIRE_DATA_START,
        payload: token
    }
)

export const deleteSurveyStart = (question_data, token) => (
    {
        type: dashboardTypes.DELETE_SURVEY_START,
        payload: {question_data, token}
})

export const fillQuestionStart = (quest_data, token) => (
    {
        type: dashboardTypes.FILL_QUESTION_START,
        payload: {quest_data, token}
    }
)

export const submitQuestionStart = (id, token) => (
    {
        type: dashboardTypes.SUBMIT_QUESTION_START,
        payload: {id, token}
    }
)

export const endSurveyStart = (questid, token) => (
    {
        type: dashboardTypes.END_SURVEY_START,
        payload: {questid, token}
    }
)

export const downloadSurveyStart = (questid, token) => (
    {
        type: dashboardTypes.DOWNLOAD_SURVEY_START,
        payload: {questid, token}
    }
)

export const apiError = (error) => (
    {
        type: dashboardTypes.API_FAILED,
        payload: error
})