import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import userManagementTypes from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
// import { setLoggeedInUser,postLogin } from '../../../helpers/authUtils';
import { addUserSuccess, deleteUserSuccess, changeUserRoleSuccess, sendEmailSuccess } from '../.././helpers/userManagementUtil';

//If user is login then dispatch redux action's are directly from here.
function* addUserSuccesss({ payload: { user_data, history } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(addUserSuccess, { user_data });
        console.log(response);
        history.push('/user-management');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchAddUser() {
    yield takeEvery(userManagementTypes.ADD_USER_SUCCESSFUL, addUserSuccesss)
}

// function* addUserSaga() {
//     yield all([fork(watchAddUser)]);
// }

function* deleteUserSuccesss({ payload: { user_data, history } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(deleteUserSuccess, { user_data });
        console.log(response);
        history.push('/user-management');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchDeleteUser() {
    yield takeEvery(userManagementTypes.DELETE_USER_SUCCESSFUL, deleteUserSuccesss)
}

function* changeUserRoleSuccesss({ payload: { user_data, history } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(changeUserRoleSuccess, { user_data });
        console.log('SAGA RESPONSE : ', response);
        // yield put({type: userManagementTypes.CHANGE_USER_ROLE_SUCCESSFUL, 
        //             payload: response})
        history.push('/user-management');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchChangeUserRole() {
    yield takeEvery(userManagementTypes.CHANGE_USER_ROLE_START, changeUserRoleSuccesss)
}

function* sendEmailSuccesss({ payload: { email_data, history } }) {
    try {
        console.log('Saga', email_data);
        const response = yield call(sendEmailSuccess, { email_data });
        console.log(response);
        history.push('/user-management');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchSendEmail() {
    yield takeEvery(userManagementTypes.SEND_EMAIL_SUCCESSFUL, sendEmailSuccesss)
}

// function* deleteUserSaga() {
//     yield all([fork(watchDeleteUser)]);
// }

function* userManagementSagas() {
    yield all([call(watchAddUser),
                call(watchDeleteUser),
                call(watchChangeUserRole),
                call(watchSendEmail)]);
}

export default userManagementSagas;
// export const deleteUserSaga;
// export default getUserSaga;