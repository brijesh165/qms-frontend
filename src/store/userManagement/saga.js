import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import userManagementTypes from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
// import { setLoggeedInUser,postLogin } from '../../../helpers/authUtils';
import { getUserListStart, addUserUtil, deleteUserSuccess, changeUserRoleSuccess, sendEmailSuccess } from '../.././helpers/userManagementUtil';

//If user is login then dispatch redux action's are directly from here.

function* getUserStart() {
    try {
        console.log('GET USER START');
        const response = yield call(getUserListStart);
        console.log(response);
        yield put({
            type: userManagementTypes.GET_USER_LIST_SUCCESS,
            payload: response
        })
    } catch(error) {
        yield put(apiError(error));
    }
}

export function* watchGetUser() {
    yield takeEvery(userManagementTypes.GET_USER_LIST_START, getUserStart)
}

function* addUserStart({ payload: { user_data } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(addUserUtil, { user_data });
        console.log(response);
        yield put({
            type: userManagementTypes.ADD_USER_SUCCESSFUL,
            payload: response
        })
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchAddUser() {
    yield takeEvery(userManagementTypes.ADD_USER_START, addUserStart)
}

// function* addUserSaga() {
//     yield all([fork(watchAddUser)]);
// }

function* deleteUserSuccesss({ payload: { user_data } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(deleteUserSuccess, { user_data });
        console.log(response);
        yield put({
            type: userManagementTypes.DELETE_USER_SUCCESSFUL,
            payload: response.id
        })
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchDeleteUser() {
    yield takeEvery(userManagementTypes.DELETE_USER_SUCCESSFUL, deleteUserSuccesss)
}

function* changeUserRoleSuccesss({ payload: { user_data } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(changeUserRoleSuccess, { user_data });
        console.log('SAGA RESPONSE : ', response);
        yield put({type: userManagementTypes.CHANGE_USER_ROLE_SUCCESSFUL, 
                    payload: response})
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchChangeUserRole() {
    yield takeEvery(userManagementTypes.CHANGE_USER_ROLE_START, changeUserRoleSuccesss)
}

function* sendEmailSuccesss({ payload: { email_data } }) {
    try {
        console.log('Saga', email_data);
        const response = yield call(sendEmailSuccess, { email_data });
        console.log(response.status);
        const status = response.status == 205 ? true : false;
        yield put({type: userManagementTypes.SEND_EMAIL_SUCCESSFUL,
            payload: status})
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchSendEmail() {
    yield takeEvery(userManagementTypes.SEND_EMAIL_START, sendEmailSuccesss)
}

// function* deleteUserSaga() {
//     yield all([fork(watchDeleteUser)]);
// }

function* userManagementSagas() {
    yield all([call(watchAddUser),
                call(watchGetUser),
                call(watchDeleteUser),
                call(watchChangeUserRole),
                call(watchSendEmail)]);
}

export default userManagementSagas;
// export const deleteUserSaga;
// export default getUserSaga;