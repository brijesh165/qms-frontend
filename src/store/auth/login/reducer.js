import userLogin from './actionTypes';

const initialState = {
    loginError: null,
    user: null, 
    loading: null, 
    role: '',
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case userLogin.LOGIN_USER_START:
            state = {
                ...state,
                loading: false,
                loginError: null
            }
            break;

        case userLogin.LOGIN_USER_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                role: action.payload.role,
                loading: true,
                loginError: null,
            }
            break;

        case userLogin.API_FAILED:
            state = {
                ...state,
                loading: false,
                loginError: action.payload
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;