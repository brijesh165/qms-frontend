import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { RESET_PASSWORD } from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
import { postResetPwd } from '../../../helpers/authUtils';

//If user is login then dispatch redux action's are directly from here.
function* resetPassword({ payload: { password, params, history } }) {
        try {
            const response = yield call(postResetPwd, {password, params});
            if(response)
               history.push('/login');
        } catch (error) {
            yield put(apiError(error));
        }
}

export function* watchPasswordReset() {
    yield takeEvery(RESET_PASSWORD, resetPassword)
}

function* resetSaga() {
    yield all([fork(watchPasswordReset)]);
}

export default resetSaga;