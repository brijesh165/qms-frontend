import userManagementTypes from './actionTypes';

const initialState = {
    userManagementError: null, loading: null, userData: null,
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
            const allUser = [];
            for (let i=0; i<action.payload.length; i++) {
                const newUser = {
                    "id": action.payload[i].id,
                    "qmsid": action.payload[i].qmsid,
                    "role": action.payload[i].role,
                    "usercompany": action.payload[i].usercompany,
                    "userdelg": action.payload[i].userdelg,
                    "useremail": action.payload[i].useremail,
                    "username": action.payload[i].username,
                }
                allUser.push(newUser);
            }
            state = {
                ...state,
                loading: false,
                userManagementError: null,
                userData: allUser
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
                "id": action.payload.id,
                "qmsid": action.payload.qmsid,
                "role": action.payload.role,
                "usercompany": action.payload.usercompany,
                "userdelg": action.payload.userdelg,
                "useremail": action.payload.useremail,
                "username": action.payload.username,
            };
            const prevUser = [...state.userData];
            console.log('Prev USER : ', prevUser);
            const addedUser = prevUser.push(newAddUser);
            state = {
                ...state,
                loading: false,
                userManagementError: null,
                userData: addedUser
            }
            break;
        case userManagementTypes.DELETE_USER_SUCCESSFUL: 
            state = {
                ...state, 
                loading: false,
                userManagementError: null
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
            let changeRole = [...state.userData];
            const changeRoleStart = changeRole.filter((item, index) => {
                return (item.id === action.payload.id) ? index : null
            });
            changeRole[changeRoleStart].role = action.payload.userrole;
            console.log('CHANGE ROLE START : ', changeRole);
            state = {
                ...state, 
                loading: false,
                userManagementError: null,
                userData: changeRole
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