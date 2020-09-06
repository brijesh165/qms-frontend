import dashboardTypes from './actionTypes';

export const getSurveyStart = () => (
    {
        type: dashboardTypes.GET_SURVEY_DATA_START
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