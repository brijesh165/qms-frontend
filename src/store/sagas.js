import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';
import resetSaga from './auth/resetpwd/saga';
import profileUpdateSaga from './profile/saga';
// import addUserSaga from './userManagement/saga';
// import deleteUserSaga from './userManagement/saga';
import userManagementSagas from './userManagement/saga';
import questionnaireManagementSagas from './questionnaire/saga';
export default function* rootSaga() {
    yield all([
        accountSaga(),
        loginSaga(),
        forgetSaga(),
        resetSaga(),
        profileUpdateSaga(),
        userManagementSagas(),
        questionnaireManagementSagas()
        // addUserSaga(),
        // deleteUserSaga()
    ])
}