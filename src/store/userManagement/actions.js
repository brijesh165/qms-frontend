import { ADD_USER_SUCCESSFUL, API_FAILED } from './actionTypes';

export const addUserSuccessful = (user_data, history) => {
    console.log('Action : ', user_data);
    return {
        type: ADD_USER_SUCCESSFUL,
        payload: {user_data, history}
    }
}

export const apiError = (error) => {
    return {
        type: API_FAILED,
        payload: error
    }
}