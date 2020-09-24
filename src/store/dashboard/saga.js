import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import dashboardTypes from './actionTypes';
import { getQuestionaireUtil, endSurveyUtil, downloadSurveyUtil, 
        getUserQuestionaireUtil, getAdminQuestionaireUtil, fillQuestionUtil,
        submitQuestionUtil } from './../../helpers/dashboardManagementUtil';
import {deleteQuestionnaireUtil} from './../../helpers/questionnaireUtil';

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
            yield put({type: dashboardTypes.GET_QUESTIONAIRE_DATA_FAIL, payload: response.data.message});
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
            yield put({type: dashboardTypes.GET_ADMIN_QUESTIONAIRE_DATA_FAIL, payload: response});
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
            yield put({type: dashboardTypes.GET_USER_QUESTIONAIRE_DATA_FAIL, payload: response});
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error});
    }
}

export function* watchGetUserSurvey() {
    yield takeEvery(dashboardTypes.GET_USER_QUESTIONAIRE_DATA_START, getUserQuestionaireSaga);
}

function* deleteQuestionnaireSaga({ payload: question_data }) {
    try {
        const id = question_data.question_data;
        const token = question_data.token;
        const response = yield call(deleteQuestionnaireUtil, { id, token });
        if (response.status === 200) {
            yield put({
                type: dashboardTypes.DELETE_SURVEY_SUCCESS,
                payload: response.id
            })
        } else {
            yield put({ type: dashboardTypes.DELETE_SURVEY_FAIL, payload: response.message })
        }
    } catch (error) {
        yield put({ type: dashboardTypes.API_FAILED, payload: error })
    }
}

export function* watchDeleteQuestionnaire() {
    yield takeEvery(dashboardTypes.DELETE_SURVEY_START, deleteQuestionnaireSaga)
}

function* endSurveySaga({payload: questid}) {
    try {
        const id = questid.questid;
        const token = questid.token;
        const response = yield call(endSurveyUtil, {id, token});
        console.log(response);
        if (response.status === 200) {
            yield put({type: dashboardTypes.END_SURVEY_SUCCESS,
                    payload: response.id})
        } else {
            yield put({type: dashboardTypes.END_SURVEY_FAIl, payload: response.message})
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error})
    }
}

export function* watchEndSurvey() {
    yield takeEvery(dashboardTypes.END_SURVEY_START, endSurveySaga)
}

function* downloadSurveySaga({payload: questid}) {
    try {
        const questId = questid.questid;
        const token = questid.token;
        console.log('DOWNLOAD SURVEY SAGA : ', questId, token);
        const response = yield call(downloadSurveyUtil, {questId, token});
        console.log(response);
        if (response.status === 200) {
            yield put({type: dashboardTypes.DOWNLOAD_SURVEY_SUCCESS,
                    payload: response.data})
        } else {
            yield put({type: dashboardTypes.DOWNLOAD_SURVEY_FAIL, payload: response.message})
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error})
    }
}

export function* watchDownloadSurvey() {
    yield takeEvery(dashboardTypes.DOWNLOAD_SURVEY_START, downloadSurveySaga)
}

function* fillQuestionSaga({payload: quest_data}) {
    try {
        const data = quest_data.quest_data;
        const token = quest_data.token;
        const response = yield call(fillQuestionUtil, {data, token});
        console.log(response);
        if (response.status === 200) {
            yield put({type: dashboardTypes.FILL_QUESTION_SUCCESS,
                    payload: response})
        } else {
            yield put({type: dashboardTypes.FILL_QUESTION_FAIl, payload: response.message})
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error})
    }
}

export function* watchFillQuestion() {
    yield takeEvery(dashboardTypes.FILL_QUESTION_START, fillQuestionSaga)
}

function* submitQuestionSaga({payload: quest_data}) {
    try {
        const id = quest_data.id;
        const token = quest_data.token;
        const response = yield call(submitQuestionUtil, {id, token});
        console.log(response);
        if (response.status === 200) {
            yield put({type: dashboardTypes.SUBMIT_QUESTION_SUCCESS,
                    payload: response.data})
        } else {
            yield put({type: dashboardTypes.SUBMIT_QUESTION_FAIL, payload: response.message})
        }
    } catch (error) {
        yield put({type: dashboardTypes.API_FAILED, payload: error})
    }
}

export function* watchSubmitQuestion() {
    yield takeEvery(dashboardTypes.SUBMIT_QUESTION_START, submitQuestionSaga)
}

function* dashboardManagementSagas() {
    yield all([call(watchGetSurvey),
                call(watchGetUserSurvey),
                call(watchGetAdminSurvey),
                call(watchDeleteQuestionnaire),
                call(watchEndSurvey),
                call(watchFillQuestion),
                call(watchSubmitQuestion),
                call(watchDownloadSurvey)]);
}

export default dashboardManagementSagas;