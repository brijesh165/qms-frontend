import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import userManagementTypes from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
// import { setLoggeedInUser,postLogin } from '../../../helpers/authUtils';
import { getUserListUtil, 
        getQuestionsUtil,
        addUserUtil, deleteUserSuccess, changeUserRoleSuccess, sendEmailSuccess } from '../.././helpers/userManagementUtil';
import resetPassword from '../auth/resetpwd/actionTypes';

//If user is login then dispatch redux action's are directly from here.

function* getUserSaga({payload: token}) {
    try {
        console.log('GET USER SAGA', token);
        const response = yield call(getUserListUtil, token);
        console.log(response);
        if (response.status === 200) {
            yield put({
                type: userManagementTypes.GET_USER_LIST_SUCCESS,
                payload: response
            })    
        } else {
            yield put({type: userManagementTypes.API_FAILED, payload: response.message})
        }
    } catch(error) {
        yield put({type: userManagementTypes.API_FAILED, payload: error})
    }
}

export function* watchGetUser() {
    yield takeEvery(userManagementTypes.GET_USER_LIST_START, getUserSaga)
}

function* getQuestionsSaga({payload: token}) {
    try {
        console.log('GET QUESTIONS SAGA', token);
        const response = yield call(getQuestionsUtil, token);
        console.log(response);
        if (response.status === 200) {
            yield put({
                type: userManagementTypes.GET_QUESTIONS_SUCCESS,
                payload: response
            })    
        } else {
            yield put({type: userManagementTypes.API_FAILED, payload: response.message})
        }
    } catch(error) {
        yield put({type: userManagementTypes.API_FAILED, payload: error})
    }
}

export function* watchGetQuestions() {
    yield takeEvery(userManagementTypes.GET_QUESTIONS_START, getQuestionsSaga)
}

function* addUserStart({ payload: {user_data, token} }) {
    try {
        console.log('Saga', user_data, token);
        const response = yield call(addUserUtil, {user_data, token});
        console.log(response);
        if (response.status === 200) {
            yield put({
                type: userManagementTypes.ADD_USER_SUCCESSFUL,
                payload: response
            })    
        } else {
            yield put({type: userManagementTypes.ADD_USER_FAIL, payload: response.message})
        }
    } catch (error) {
        yield put({type: userManagementTypes.ADD_USER_FAIL, payload: error})
    }
}

export function* watchAddUser() {
    yield takeEvery(userManagementTypes.ADD_USER_START, addUserStart)
}

function* deleteUserSuccesss({ payload: { user_data, token } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(deleteUserSuccess, { user_data, token });
        console.log(response);
        if (response.status === 200) {
            yield put({
                type: userManagementTypes.DELETE_USER_SUCCESSFUL,
                payload: response.id
            })    
        } else {
            yield put({type: userManagementTypes.DELETE_USER_FAIL, payload: response.message})
        }
    } catch (error) {
        yield put({type: userManagementTypes.DELETE_USER_FAIL, payload: error})
    }
}

export function* watchDeleteUser() {
    yield takeEvery(userManagementTypes.DELETE_USER_START, deleteUserSuccesss)
}

function* changeUserRoleSuccesss({ payload: { user_data, token } }) {
    try {
        console.log('Saga', user_data);
        const response = yield call(changeUserRoleSuccess, { user_data, token });
        console.log('SAGA RESPONSE : ', response);
        if (response.status === 200) {
            yield put({type: userManagementTypes.CHANGE_USER_ROLE_SUCCESSFUL, 
                payload: response})
        } else {
            yield put({type: userManagementTypes.CHANGE_USER_ROLE_FAIL, payload: response.message})
        }
    } catch (error) {
        yield put({type: userManagementTypes.CHANGE_USER_ROLE_FAIL, payload: error})
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

function* userManagementSagas() {
    yield all([call(watchAddUser),
                call(watchGetQuestions),
                call(watchGetUser),
                call(watchDeleteUser),
                call(watchChangeUserRole),
                call(watchSendEmail)]);
}

export default userManagementSagas;
