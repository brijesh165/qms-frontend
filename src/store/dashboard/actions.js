import dashboardTypes from './actionTypes';

export const getSurveyStart = () => (
    {
        type: dashboardTypes.GET_SURVEY_DATA_START
    }
)

export const apiError = (error) => (
    {
        type: dashboardTypes.API_FAILED,
        payload: error
})