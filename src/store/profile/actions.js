import { PROFILE_UPDATE_SUCCESSFUL, API_FAILED } from './actionTypes';

export const profileUpdateSuccessful = (profile_data, history) => {
    console.log('Action', profile_data);
    console.log('Action', history);
    return {
        type: PROFILE_UPDATE_SUCCESSFUL,
        payload: {profile_data, history}
    }
}

export const apiError = (error) => {
    return {
        type: API_FAILED,
        payload: error
    }
}