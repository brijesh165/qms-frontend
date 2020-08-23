import { RESET_PASSWORD_SUCCESSFUL, RESET_PASSWORD, API_FAILED } from './actionTypes';

const initialState = {
    forgetError: null, message: null, loading: false
}

const forgetpwd = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD:
            state = {
                ...state,
                user: null,
                loading: true,
                forgetError: null,
            }
            break;
        case RESET_PASSWORD_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                loading: false,
                forgetError: null
            }
            break;
        case API_FAILED:
            state = {
                ...state,
                loading: false,
                forgetError: action.payload
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default forgetpwd;