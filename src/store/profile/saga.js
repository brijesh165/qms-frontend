import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import profilePage from './actionTypes';

// AUTH related methods
import { getProfileUtil ,updateProfileUtil, changePasswordUtil } from '../.././helpers/profileUtils';

function* getProfileSaga({payload: token}) {
    try {
        console.log('GET PROFILE SAGA : ', token);
        const response = yield call(getProfileUtil, token);
        console.log(response);
        if (response.status === 200) {
            yield put({type: profilePage.GET_PROFILE_SUCCESSFUL, payload: response})
        } else {
            yield put({type: profilePage.API_FAILED, payload: response.message})
        }
    } catch (error) {
        console.log('PROFILE PAGE ERROR : ', error);
        yield put({type: profilePage.API_FAILED, payload: error})
    }
}

export function* watchGetProfile() {
    yield takeEvery(profilePage.GET_PROFILE_START, getProfileSaga)
}

//If user is login then dispatch redux action's are directly from here.
function* UpdateProfileSaga({ payload: update_data }) {
    try {
        console.log('Saga', update_data);
        const response = yield call(updateProfileUtil, update_data);
        console.log('UPDATE PROFILE SAGA RESPONSE : ', response);
        if (response.status === 200) {
            yield put({type: profilePage.UPDATE_PROFILE_SUCCESSFUL, payload: response})
        } else {
            yield put({type: profilePage.API_FAILED, payload: response.message})
        }
    } catch (error) {
        yield put({type: profilePage.API_FAILED, payload: error.message});
    }
}

export function* watchProfileUpdate() {
    yield takeEvery(profilePage.UPDATE_PROFILE_START, UpdateProfileSaga)
}

function* changePasswordSaga({ payload: change_password_data }) {
    try {
        console.log('Saga', change_password_data);
        const response = yield call(changePasswordUtil, change_password_data);
        console.log(response);
        if (response.status === 200) {
            yield put({type: profilePage.CHANGE_PASSWORD_SUCCESS, payload: response})
        } else {
            yield put({type: profilePage.CHANGE_PASSWORD_FAIL, payload: response.message})
        }
    } catch (error) {
        yield put({type: profilePage.CHANGE_PASSWORD_FAIL, payload: error.message});
    }
}

export function* watchChangePassword() {
    yield takeEvery(profilePage.CHANGE_PASSWORD_START, changePasswordSaga)
}

function* profileUpdateSaga() {
    yield all([call(watchProfileUpdate),
                call(watchGetProfile),
                call(watchChangePassword)]);
}


export default profileUpdateSaga;