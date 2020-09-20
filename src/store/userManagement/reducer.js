import userManagementTypes from './actionTypes';

const initialState = {
    userManagementError: null, loading: null, userData: null, questions: null,
    addUserFail: false,
    addUserError: null,
    deleteUserFail: false,
    deleteUserError: null,
    changeUserRoleFail: false,
    changeUserRoleError: null, 
    sendEmailSuccess: false
}

const userManagement = (state = initialState, action) => {
    console.log('Reducer Action:', action.type);
    console.log('Reducer Payload:', action.payload);
    switch (action.type) {
        case userManagementTypes.GET_USER_LIST_START: 
            state = {
                ...state,
                loading: false,
                userManagementError: null
            }
            break;
        case userManagementTypes.GET_USER_LIST_SUCCESS:
            state = {
                ...state,
                loading: true,
                userManagementError: null,
                userData: action.payload.users,
            }
            break;
        case userManagementTypes.GET_QUESTIONS_START: 
            state = {
                ...state,
                loading: false,
                userManagementError: null
            }
            break;
        case userManagementTypes.GET_QUESTIONS_SUCCESS:
            state = {
                ...state,
                loading: true,
                userManagementError: null,
                questions: action.payload.questions,
            }
            break;
        case userManagementTypes.ADD_USER_START: 
            state = {
                ...state,
                userManagementError: null
            }
            break;
        case userManagementTypes.ADD_USER_SUCCESSFUL:
            const newAddUser = {
                "id": action.payload.data.id,
                "qmsid": action.payload.data.qmsid,
                "role": action.payload.data.role,
                "usercompany": action.payload.data.usercompany,
                "userdelg": action.payload.data.userdelg,
                "useremail": action.payload.data.useremail,
                "username": action.payload.data.username,
            };
            const prevUser = [...state.userData];
            const addedUser = [...prevUser, newAddUser];
            state = {
                ...state,
                userManagementError: null,
                userData: addedUser
            }
            break;
        case userManagementTypes.ADD_USER_FAIL: 
            state = {
                ...state,
                addUserFail: true,
                addUserError: action.payload
            }
            break;
        case userManagementTypes.DELETE_USER_START: 
            state = {
                ...state,
                userManagementError: null
            }
            break;
        case userManagementTypes.DELETE_USER_SUCCESSFUL: 
            const prevDeleteUser = [...state.userData];
            const userAfterDelete = prevDeleteUser.filter((item) => {
                return item.id !== action.payload
            });
            state = {
                ...state, 
                userManagementError: null,
                userData: userAfterDelete
            }
            break;
        case userManagementTypes.DELETE_USER_FAIL:
            state = {
                ...state,
                deleteUserFail: true,
                deleteUserError: action.payload
            }
            break;
        case userManagementTypes.CHANGE_USER_ROLE_START: 
            state = {
                ...state, 
                userManagementError: null
            }
            break;
        case userManagementTypes.CHANGE_USER_ROLE_SUCCESSFUL: 
            let changeUserRole = [...state.userData];
            let changeRoleFilter = changeUserRole.find((item)=> {
                return item.id === action.payload.id
            });
            let index = changeUserRole.findIndex(item => item.id === action.payload.id);
            let userAfterChangeRole = {...changeRoleFilter, ...{role:action.payload.userrole}};
            changeUserRole[index] = userAfterChangeRole;

            console.log('AFTER CHANGE ROLE : ', changeUserRole);
            state = {
                ...state, 
                userManagementError: null,
                userData: changeUserRole,
            }
            break;
        case userManagementTypes.CHANGE_USER_ROLE_FAIL: 
            state = {
                ...state,
                changeUserRoleFail: true,
                changeUserRoleError: action.payload 
            }
            break;
        case userManagementTypes.SEND_EMAIL_START:
            state = {
                ...state,
                loading: false,
                userManagementError: null
            }
            break;
        case userManagementTypes.SEND_EMAIL_SUCCESSFUL: 
            state = {
                ...state, 
                loading: true,
                userManagementError: null,
                sendEmailSuccess: action.payload
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