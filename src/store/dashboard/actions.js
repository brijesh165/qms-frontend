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

export const fillQuestionStart = (quest_data) => (
    {
        type: dashboardTypes.FILL_QUESTION_START,
        payload: quest_data
    }
)

export const submitQuestionStart = (quest_data) => (
    {
        type: dashboardTypes.SUBMIT_QUESTION_START,
        payload: quest_data
    }
)

export const endSurveyStart = (questid) => (
    {
        type: dashboardTypes.END_SURVEY_START,
        payload: questid
    }
)

export const downloadSurveyStart = (questid) => (
    {
        type: dashboardTypes.DOWNLOAD_SURVEY_START,
        payload: questid
    }
)

export const apiError = (error) => (
    {
        type: dashboardTypes.API_FAILED,
        payload: error
})