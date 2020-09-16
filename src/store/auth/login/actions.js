import userLogin from './actionTypes';

export const loginUserStart = (username, password, history) => {
    return {
        type: userLogin.LOGIN_USER_START,
        payload: { username, password, history }
    }
}

export const loginUserSuccessful = (user) => {
    return {
        type: userLogin.LOGIN_USER_SUCCESSFUL,
        payload: user
    }
}

export const apiError = (error) => {
    return {
        type: userLogin.API_FAILED,
        payload: error
    }
}