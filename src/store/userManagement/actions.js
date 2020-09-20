import userManagementTypes from './actionTypes';

export const getUserListStart = (token) => (
    {
        type: userManagementTypes.GET_USER_LIST_START,
        payload: token
    }
)

export const getQuestionsStart = (token) => (
    {
        type: userManagementTypes.GET_QUESTIONS_START,
        payload: token
    }
)

export const addUserStart = (user_data, token) => (
    {
        type: userManagementTypes.ADD_USER_START,
        payload: {user_data, token}
})

export const deleteUserStart = (user_data, token) => (
    console.log('ACTION : ', user_data, token),
    {
        type: userManagementTypes.DELETE_USER_START,
        payload: {user_data, token}
})

export const changeUserRoleStart = (user_data, token) => (
    {
        type: userManagementTypes.CHANGE_USER_ROLE_START,
        payload: {user_data, token}
})

export const sendemailstart = (email_data, history) => (
    console.log('Action Change: ', email_data),
    {
        type: userManagementTypes.SEND_EMAIL_START,
        payload: {email_data, history}
})

export const apiError = (error) => {
    return {
        type: userManagementTypes.API_FAILED,
        payload: error
    }
}