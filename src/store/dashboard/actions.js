import dashboardTypes from './actionTypes';

export const getSurveyStart = () => (
    {
        type: dashboardTypes.GET_SURVEY_DATA_START
    }
)

export const getAdminSurveyStart = () => (
    {
        type: dashboardTypes.GET_ADMIN_SURVEY_DATA_START
    }
)

export const getUserSurveyStart = () => (
    console.log('GET USER ACTION'),
    {
        type: dashboardTypes.GET_USER_SURVEY_DATA_START
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