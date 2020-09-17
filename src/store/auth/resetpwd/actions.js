import resetPassword from './actionTypes';

export const resetpassword = (password, params, history) => {
    return {
        type: resetPassword.RESET_PASSWORD_START,
        payload: { password, params, history }
    }
}

export const resetPasswordSuccessful = (user) => {
    return {
        type: resetPassword.RESET_PASSWORD_SUCCESSFUL,
        payload: user
    }
}

export const apiError = (error) => {
    return {
        type: resetPassword.API_FAILED,
        payload: error
    }
}