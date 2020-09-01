import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import dashboardTypes from './actionTypes';
import { apiError } from './actions';

import { getSurveySuccess } from './../../helpers/dashboardManagementUtil';

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

function* dashboardManagementSagas() {
    yield all([call(watchGetSurvey)]);
}

export default dashboardManagementSagas;