import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import userLogin from './actionTypes';

// AUTH related methods
import { setLoggeedInUserUtil, loginUserUtil } from '../../../helpers/authUtils';

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { username, password, history } }) {
        try {
            const response = yield call(loginUserUtil, {qmsid: username, userpassword: password});
            setLoggeedInUserUtil(response);
            console.log('LOGIN USER UTIL : ', response);
            if (response.status == 200) {
                yield put({type: userLogin.LOGIN_USER_SUCCESSFUL, 
                    payload: response});
                history.push('/dashboard');
            } else {
                yield put({type: userLogin.API_FAILED, payload: response.message});
            }
        } catch (error) {
            yield put({type: userLogin.API_FAILED, payload: error});
        }
}

export function* watchUserLogin() {
    yield takeEvery(userLogin.LOGIN_USER_START, loginUser)
}

function* loginSaga() {
    yield all([fork(watchUserLogin)]);
}

export default loginSaga;