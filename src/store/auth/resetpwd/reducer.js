import resetPassword from './actionTypes';

const initialState = {
    resetPasswordError: null, message: null, loading: false
}

const forgetpwd = (state = initialState, action) => {
    switch (action.type) {
        case resetPassword.RESET_PASSWORD_START:
            state = {
                ...state,
                user: null,
                loading: false,
                resetPasswordError: null,
            }
            break;
        case resetPassword.RESET_PASSWORD_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                loading: true,
                resetPasswordError: null
            }
            break;
        case resetPassword.API_FAILED:
            state = {
                ...state,
                loading: false,
                resetPasswordError: action.payload
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default forgetpwd;