import { RESET_PASSWORD, RESET_PASSWORD_SUCCESSFUL, API_FAILED } from './actionTypes';

export const resetpassword = (password, params, history) => {
    return {
        type: RESET_PASSWORD,
        payload: { password, params, history }
    }
}

export const resetPasswordSuccessful = (user) => {
    return {
        type: RESET_PASSWORD_SUCCESSFUL,
        payload: user
    }
}

export const apiError = (error) => {
    return {
        type: API_FAILED,
        payload: error
    }
}