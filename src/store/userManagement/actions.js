import userManagementTypes from './actionTypes';

export const getUserListStart = () => (
    {
        type: userManagementTypes.GET_USER_LIST_START
    }
)

export const addUserStart = (user_data, history) => (
    console.log('Action Add', user_data),
    {
        type: userManagementTypes.ADD_USER_START,
        payload: {user_data, history}
})

export const deleteUserStart = (user_data, history) => (
    console.log('Action DELETE: ', user_data),
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