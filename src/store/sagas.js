import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';
import resetSaga from './auth/resetpwd/saga';

export default function* rootSaga() {
    yield all([

        //public
        accountSaga(),
        loginSaga(),
        forgetSaga(),
        resetSaga()
    ])
}