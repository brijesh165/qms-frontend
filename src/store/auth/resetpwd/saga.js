import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import resetPassword from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
import { postResetPwd } from '../../../helpers/authUtils';

//If user is login then dispatch redux action's are directly from here.
function* resetPasswordd({ payload: { password, params, history } }) {
        try {
            const response = yield call(postResetPwd, {password, params});
            console.log('RESET PASSWORD : ', response);
            if(response.status === 200) {
                history.push('/login');
            } else {
                yield put({type: resetPassword.API_FAILED, payload: response.message});
            }
        } catch (error) {
            yield put({type: resetPassword.API_FAILED, payload: error});
        }
}

export function* watchPasswordReset() {
    yield takeEvery(resetPassword.RESET_PASSWORD_START, resetPasswordd)
}

function* resetSaga() {
    yield all([fork(watchPasswordReset)]);
}

export default resetSaga;