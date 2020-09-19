import profilePage from './actionTypes';

const initialState = {
    profileError: null, loading: null,
    profileData: [], changePasswordSuccess: null,
}

const profile = (state = initialState, action) => {
    console.log('REDUCER ACTION : ', action.type);
    switch (action.type) {
        case profilePage.GET_PROFILE_START:
            state = {
                ...state,
                loading: false,
                profileError: null
            }
            break;
        case profilePage.GET_PROFILE_SUCCESSFUL:
            state = {
                ...state,
                loading: true,
                profileError: null,
                profileData: action.payload
            }
            break;
        case profilePage.UPDATE_PROFILE_START:
            state = {
                ...state,
                loading: false,
                profileError: null,
            }
            break;
        case profilePage.UPDATE_PROFILE_SUCCESSFUL:
            state = {
                ...state,
                loading: true,
                profileError: null,
            }
            break;
        case profilePage.CHANGE_PASSWORD_START: 
            state = {
                ...state,
                loading: false,
                profileError: null
            }
            break;
        case profilePage.CHANGE_PASSWORD_SUCCESS: 
            state = {
                ...state,
                loading: true,
                profileError: null,
                changePasswordSuccess: action.payload
            }
            break;
        case profilePage.API_FAILED:
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