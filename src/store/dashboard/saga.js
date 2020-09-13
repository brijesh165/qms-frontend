import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import dashboardTypes from './actionTypes';
import { apiError } from './actions';

import { getSurveySuccess, endSurveySuccess, downloadSurvetSuccess, 
        getUserSurveyUtil, getAdminSurveyUtil, fillQuestionUtil,
        submitQuestionUtil } from './../../helpers/dashboardManagementUtil';

function* getSurveySuccesss() {
    try {
        const response = yield call(getSurveySuccess);
        console.log(response);
        if (response.table1) {
            yield put({type: dashboardTypes.GET_SURVEY_DATA_SUCCESS, 
                        payload: response.table1})
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchGetSurvey() {
    yield takeEvery(dashboardTypes.GET_SURVEY_DATA_START, getSurveySuccesss)
}

function* getUserSurveyStart() {
    try {
        console.log('GET USER SURVEY START SAGA');
        const response = yield call(getUserSurveyUtil);
        console.log(response);
        if (response) {
            yield put({type: dashboardTypes.GET_USER_SURVEY_DATA_SUCCESS,
                        payload: response.questData})
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchGetUserSurvey() {
    yield takeEvery(dashboardTypes.GET_USER_SURVEY_DATA_START, getUserSurveyStart);
}

function* getAdminSurveyStart() {
    try {
        const response = yield call(getAdminSurveyUtil);
        console.log(response);
        if (response) {
            yield put({type: dashboardTypes.GET_ADMIN_SURVEY_DATA_SUCCESS,
                        payload: response})
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchGetAdminSurvey() {
    yield takeEvery(dashboardTypes.GET_ADMIN_SURVEY_DATA_START, getAdminSurveyStart);
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
        if (response.data) {
            yield put({type: dashboardTypes.FILL_QUESTION_SUCCESS,
                    payload: response.data})
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