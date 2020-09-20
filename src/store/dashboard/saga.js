import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import dashboardTypes from './actionTypes';
import { apiError } from './actions';

import { getQuestionaireUtil, endSurveySuccess, downloadSurvetSuccess, 
        getUserQuestionaireUtil, getAdminQuestionaireUtil, fillQuestionUtil,
        submitQuestionUtil } from './../../helpers/dashboardManagementUtil';
import resetPassword from '../auth/resetpwd/actionTypes';

function* getQuestionaireSaga({payload: token}) {
    try {
        // const localStorageData = JSON.parse(localStorage.getItem('user'));
        console.log('GET QUESTIONAIRE SAGA : ', token);
        const response = yield call(getQuestionaireUtil, token);
        console.log(response);
        if (response.status === 200) {
            yield put({type: dashboardTypes.GET_QUESTIONAIRE_DATA_SUCCESS, 
                        payload: response.Questions})
        } else {
            yield put({type: dashboardTypes.API_FAILED, payload: response.data.message});
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error});
    }
}

export function* watchGetSurvey() {
    yield takeEvery(dashboardTypes.GET_QUESTIONAIRE_DATA_START, getQuestionaireSaga)
}

function* getAdminQuestionaireSaga({payload: token}) {
    try {
        console.log('GET ADMIN SURVEY START SAGA', token);
        const response = yield call(getAdminQuestionaireUtil, token);
        console.log('ADMIN : ', response);
        if (response.questionare && response.responses) {
            yield put({type: dashboardTypes.GET_ADMIN_QUESTIONAIRE_DATA_SUCCESS,
                        payload: response})
        } else {
            yield put({type: dashboardTypes.API_FAILED, payload: response});
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error});
    }
}

export function* watchGetAdminSurvey() {
    yield takeEvery(dashboardTypes.GET_ADMIN_QUESTIONAIRE_DATA_START, getAdminQuestionaireSaga);
}

function* getUserQuestionaireSaga({payload: token}) {
    try {
        console.log('GET USER SURVEY START SAGA', token);
        const response = yield call(getUserQuestionaireUtil, token);
        console.log(response);
        if (response.status === 200) {
            yield put({type: dashboardTypes.GET_USER_QUESTIONAIRE_DATA_SUCCESS,
                        payload: response})
        } else {
            yield put({type: dashboardTypes.API_FAILED, payload: response});
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error});
    }
}

export function* watchGetUserSurvey() {
    yield takeEvery(dashboardTypes.GET_USER_QUESTIONAIRE_DATA_START, getUserQuestionaireSaga);
}

function* endSurveyStart({payload: questid}) {
    try {
        const response = yield call(endSurveySuccess, questid);
        console.log(response);
        if (response) {
            yield put({type: dashboardTypes.END_SURVEY_SUCCESS,
                    payload: response.id})
        }
    } catch (error) {
        yield put(apiError(error))
    }
}

export function* watchEndSurvey() {
    yield takeEvery(dashboardTypes.END_SURVEY_START, endSurveyStart)
}

function* downloadSurvetStart({payload: questid}) {
    try {
        console.log(questid)
        const response = yield call(downloadSurvetSuccess, questid);
        console.log(response);
        if (response.data) {
            yield put({type: dashboardTypes.DOWNLOAD_SURVEY_SUCCESS,
                    payload: response.data})
        }
    } catch (error) {
        yield put(apiError(error))
    }
}

export function* watchDownloadSurvey() {
    yield takeEvery(dashboardTypes.DOWNLOAD_SURVEY_START, downloadSurvetStart)
}

function* fillQuestionStart({payload: quest_data}) {
    try {
        console.log(quest_data)
        const response = yield call(fillQuestionUtil, quest_data);
        console.log(response);
        if (response) {
            yield put({type: dashboardTypes.FILL_QUESTION_SUCCESS,
                    payload: response})
        }
    } catch (error) {
        yield put(apiError(error))
    }
}

export function* watchFillQuestion() {
    yield takeEvery(dashboardTypes.FILL_QUESTION_START, fillQuestionStart)
}

function* submitQuestionStart({payload: quest_data}) {
    try {
        console.log(quest_data)
        const response = yield call(submitQuestionUtil, quest_data);
        console.log(response);
        if (response.data) {
            yield put({type: dashboardTypes.SUBMIT_QUESTION_SUCCESS,
                    payload: response.data})
        }
    } catch (error) {
        yield put(apiError(error))
    }
}

export function* watchSubmitQuestion() {
    yield takeEvery(dashboardTypes.SUBMIT_QUESTION_START, submitQuestionStart)
}

function* dashboardManagementSagas() {
    yield all([call(watchGetSurvey),
                call(watchGetUserSurvey),
                call(watchGetAdminSurvey),
                call(watchEndSurvey),
                call(watchFillQuestion),
                call(watchSubmitQuestion),
                call(watchDownloadSurvey)]);
}

export default dashboardManagementSagas;