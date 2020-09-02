import userManagementTypes from './actionTypes';

export const addUserSuccessful = (user_data, history) => (
    console.log('Action Add', user_data),
    {
        type: userManagementTypes.ADD_USER_SUCCESSFUL,
        payload: {user_data, history}
})

export const deleteUserSuccessful = (user_data, history) => (
    console.log('Action Add: ', user_data),
    {
        type: userManagementTypes.DELETE_USER_SUCCESSFUL,
        payload: {user_data, history}
})

export const changeUserRoleStart = (user_data, history) => (
    console.log('Action Change: ', user_data),
    {
        type: userManagementTypes.CHANGE_USER_ROLE_START,
        payload: {user_data, history}
})

export const sendemailsuccessful = (email_data, history) => (
    console.log('Action Change: ', email_data),
    {
        type: userManagementTypes.SEND_EMAIL_SUCCESSFUL,
        payload: {email_data, history}
})

export const apiError = (error) => {
    return {
        type: userManagementTypes.API_FAILED,
        payload: error
    }
}