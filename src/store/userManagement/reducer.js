import { API_FAILED, ADD_USER_SUCCESSFUL } from './actionTypes';

const initialState = {
    profileError: null, loading: null, userData: null
}

const userManagement = (state = initialState, action) => {
    console.log('Reducer', action.type);
    console.log('Reducer', action.payload);
    switch (action.type) {
        case ADD_USER_SUCCESSFUL:
            state = {
                ...state,
                loading: false,
                userManagementError: null,
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

export default userManagement;