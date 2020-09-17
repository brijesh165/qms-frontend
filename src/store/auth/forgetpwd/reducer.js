import forgotPassword from './actionTypes';

const initialState = {
    forgetPasswordError: null, 
    message: null, 
    loading: false
}

const forgetpwd = (state = initialState, action) => {
    switch (action.type) {
        case forgotPassword.FORGET_PASSWORD_START:
            state = {
                ...state,
                user: null,
                loading: false,
                forgetPasswordError: null
            }
            break;
        case forgotPassword.FORGET_PASSWORD_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                loading: true,
                forgetPasswordError: null
            }
            break;
        case forgotPassword.API_FAILED:
            state = {
                ...state,
                loading: false,
                forgetPasswordError: action.payload
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default forgetpwd;