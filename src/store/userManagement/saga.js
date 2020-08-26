import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { ADD_USER_SUCCESSFUL } from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
// import { setLoggeedInUser,postLogin } from '../../../helpers/authUtils';
import { addUserSuccess } from '../.././helpers/userManagementUtil';

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
    yield takeEvery(ADD_USER_SUCCESSFUL, addUserSuccesss)
}

function* addUserSaga() {
    yield all([fork(watchAddUser)]);
}


export default addUserSaga;