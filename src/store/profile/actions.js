import profilePage from './actionTypes';

export const getProfileStart = (token) => {
    return {
        type: profilePage.GET_PROFILE_START,
        payload: token
    }
}

export const updateProfileStart = (update_data) => {
    return {
        type: profilePage.UPDATE_PROFILE_START,
        payload: update_data
    }
}

export const changePasswordStart = (change_password_data) => {
    return {
        type: profilePage.CHANGE_PASSWORD_START,
        payload: change_password_data
    }
}

export const apiError = (error) => {
    return {
        type: profilePage.API_FAILED,
        payload: error
    }
}