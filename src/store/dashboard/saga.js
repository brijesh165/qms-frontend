import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import dashboardTypes from './actionTypes';
import { apiError } from './actions';

import { getSurveySuccess, endSurveySuccess, downloadSurvetSuccess } from './../../helpers/dashboardManagementUtil';

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

function* dashboardManagementSagas() {
    yield all([call(watchGetSurvey),
                call(watchEndSurvey),
                call(watchDownloadSurvey)]);
}

export default dashboardManagementSagas;