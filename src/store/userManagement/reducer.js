import userManagementTypes from './actionTypes';

const initialState = {
    userManagementError: null, loading: null, userData: null, questions: null
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
            const allUser = [...action.payload.users];
            const allQuestions = [...action.payload.questions];
            state = {
                ...state,
                loading: true,
                userManagementError: null,
                userData: allUser,
                questions: allQuestions
            }
            break;
        case userManagementTypes.ADD_USER_START: 
            state = {
                ...state,
                loading: false,
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
                loading: true,
                userManagementError: null,
                userData: addedUser
            }
            break;
        case userManagementTypes.DELETE_USER_START: 
            state = {
                ...state,
                loading: false,
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
                loading: true,
                userManagementError: null,
                userData: userAfterDelete
            }
            break;
        case userManagementTypes.CHANGE_USER_ROLE_START: 
            state = {
                ...state, 
                loading: false,
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
                loading: true,
                userManagementError: null,
                userData: changeUserRole,
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