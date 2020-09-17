import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
// import { FORGET_USER } from './actionTypes';
import forgotPassword from './actionTypes';

// AUTH related methods
import { forgetPasswordUtil } from '../../../helpers/authUtils';

//If user is login then dispatch redux action's are directly from here.
function* forgetUser({ payload: { qmsid, history } }) {
        try {
            const response = yield call(forgetPasswordUtil, {qmsid});
            console.log('Forget Password Response : ', response);
            if(response.status === 200){
                history.push('/reset-password');
            } else {
                yield put({type: forgotPassword.API_FAILED, payload: response.message});
            }
        } catch (error) {
            yield put({type: forgotPassword.API_FAILED, payload: error});
        }
}

export function* watchUserForget() {
    yield takeEvery(forgotPassword.FORGET_PASSWORD_START, forgetUser)
}

function* forgetSaga() {
    yield all([fork(watchUserForget)]);
}

export default forgetSaga;