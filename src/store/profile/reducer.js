import { PROFILE_UPDATE_SUCCESSFUL, API_FAILED } from './actionTypes';

const initialState = {
    profileError: null, loading: null
}

const profile = (state = initialState, action) => {
    console.log('Reducer', action.type);
    switch (action.type) {
        case PROFILE_UPDATE_SUCCESSFUL:
            state = {
                ...state,
                loading: false,
                profileError: null,
            }
            break;
        case API_FAILED:
            state = {
                ...state,
                loading: false,
                profileError: action.payload
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default profile;