import forgotPassword from './actionTypes';

export const forgetUser = (qmsid, history) => {
    return {
        type: forgotPassword.FORGET_PASSWORD_START,
        payload: { qmsid, history }
    }
}

export const forgetUserSuccessful = (user) => {
    return {
        type: forgotPassword.FORGET_PASSWORD_SUCCESSFUL,
        payload: user
    }
}

export const apiError = (error) => {
    return {
        type: forgotPassword.API_FAILED,
        payload: error
    }
}