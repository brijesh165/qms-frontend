import userManagementTypes from './actionTypes';
import userManagementSagas from './saga';

const initialState = {
    userManagementError: null, loading: null, userData: null
}

const userManagement = (state = initialState, action) => {
    console.log('Reducer', action.type);
    console.log('Reducer', action.payload);
    switch (action.type) {
        case userManagementTypes.ADD_USER_SUCCESSFUL:
            state = {
                ...state,
                loading: false,
                userManagementError: null,
            }
            break;
        case userManagementTypes.DELETE_USER_SUCCESSFUL: 
            state = {
                ...state, 
                loading: false,
                userManagementError: null
            }
            break;
        case userManagementTypes.CHANGE_USER_ROLE_SUCCESSFUL: 
            state = {
                ...state, 
                loading: false,
                userManagementError: null
            }
            break;
        case userManagementTypes.SEND_EMAIL_SUCCESSFUL: 
            state = {
                ...state, 
                loading: false,
                userManagementError: null
            }
            break;
        case userManagementTypes.API_FAILED:
            state = {
                ...state,
                loading: false,
                userManagementError: action.payload
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default userManagement;