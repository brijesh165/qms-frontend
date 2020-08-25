import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { PROFILE_UPDATE_SUCCESSFUL } from './actionTypes';
import {  apiError, profileUpdateSuccessful } from './actions';

// AUTH related methods
// import { setLoggeedInUser,postLogin } from '../../../helpers/authUtils';
import { profileUpdate } from '../.././helpers/profileUtils';

//If user is login then dispatch redux action's are directly from here.
function* profileUpdatee({ payload: { profile_data, history } }) {
        try {
            console.log('Saga', profile_data);
            const response = yield call(profileUpdate, {profile_data});
            console.log(response);
            //  yield put(profileUpdateSuccessful(response));
            history.push('/dashboard');
        } catch (error) {
            yield put(apiError(error));
        }
}

export function* watchProfileUpdate() {
    yield takeEvery(PROFILE_UPDATE_SUCCESSFUL, profileUpdatee)
}

function* profileUpdateSaga() {
    yield all([fork(watchProfileUpdate)]);
}

export default profileUpdateSaga;