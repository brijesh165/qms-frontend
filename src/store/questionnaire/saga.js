import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import questionnaire from './actionTypes';

// AUTH related methods
import {
    addQuestionnaireUtil,
    getQuestionnaireUtil,
    deleteQuestionnaireUtil,
    reeditQuestionnaireUtil,
    copyQuestionnaireUtil
} from '../.././helpers/questionnaireUtil';

//If user is login then dispatch redux action's are directly from here.
function* getQuestionnaireSaga({ payload: token }) {
    try {
        const response = yield call(getQuestionnaireUtil, token);
        if (response.status === 200) {
            yield put({
                type: questionnaire.GET_QUESTIONNAIRE_SUCCESSFUL,
                payload: response.Questions
            })
        } else {
            yield put({ type: questionnaire.GET_QUESTIONNAIRE_FAIL, payload: response.message })
        }
    } catch (error) {
        yield put({ type: questionnaire.API_FAILED, payload: error })
    }
}

export function* watchGetQuestionnaire() {
    yield takeEvery(questionnaire.GET_QUESTIONNAIRE_START, getQuestionnaireSaga)
}

function* addQuestionnaireSaga({ payload: question_data }) {
    try {
        const question = question_data.question_data;
        const token = question_data.token;
        const response = yield call(addQuestionnaireUtil, { question, token });
        if (response.status === 200) {
            yield put({
                type: questionnaire.ADD_QUESTIONNAIRE_SUCCESSFUL,
                payload: response
            })
        } else {
            yield put({ type: questionnaire.ADD_QUESTIONNAIRE_FAIL, payload: response.message })
        }
    } catch (error) {
        yield put({ type: questionnaire.API_FAILED, payload: error })
    }
}

export function* watchAddQuestionnaire() {
    yield takeEvery(questionnaire.ADD_QUESTIONNAIRE_START, addQuestionnaireSaga)
}

function* copyQuestionnaireSaga({ payload: question_data }) {
    try {
        const questId = question_data.question_data;
        const token = question_data.token;
        const response = yield call(copyQuestionnaireUtil, { questId, token });
        if (response.status === 200) {
            yield put({
                type: questionnaire.COPY_QUESTIONNAIRE_SUCCESSFUL,
                payload: response
            })
        } else {
            yield put({ type: questionnaire.COPY_QUESTIONNAIRE_FAIL, payload: response.message });
        }
    } catch (error) {
        yield put({ type: questionnaire.API_FAILED, payload: error });
    }
}

export function* watchCopyQuestionnaire() {
    yield takeEvery(questionnaire.COPY_QUESTIONNAIRE_START, copyQuestionnaireSaga)
}

function* reeditQuestionnaireSaga({payload: question_data}) {
    try {
        const questData = question_data.question_data;
        const token = question_data.token;
        const response = yield call(reeditQuestionnaireUtil, {questData, token});
        if (response.status === 200) {
            yield put({
                type: questionnaire.REEDIT_QUESTIONNAIRE_SUCCESSFUL,
                payload: response
            })    
        } else {
            yield put({type: questionnaire.REEDIT_QUESTIONNAIRE_FAIL, payload: response.message})
        }
    } catch (error) {
        console.log('REEDIT QUESTION ERROR', error);
        yield put({type: questionnaire.API_FAILED, payload: error});
    }
}

export function* watchReEditQuestionnaire() {
    yield takeEvery(questionnaire.REEDIT_QUESTIONNAIRE_START, reeditQuestionnaireSaga)
}

function* deleteQuestionnaireSaga({ payload: question_data }) {
    try {
        const id = question_data.question_data;
        const token = question_data.token;
        const response = yield call(deleteQuestionnaireUtil, { id, token });
        if (response.status === 200) {
            yield put({
                type: questionnaire.DELETE_QUESTIONNAIRE_SUCCESSFUL,
                payload: response.id
            })
        } else {
            yield put({ type: questionnaire.DELETE_QUESTIONNAIRE_FAIL, payload: response.message })
        }
    } catch (error) {
        yield put({ type: questionnaire.API_FAILED, payload: error })
    }
}

export function* watchDeleteQuestionnaire() {
    yield takeEvery(questionnaire.DELETE_QUESTIONNAIRE_START, deleteQuestionnaireSaga)
}

function* questionnaireManagementSagas() {
    yield all([
        call(watchAddQuestionnaire),
        call(watchGetQuestionnaire),
        call(watchReEditQuestionnaire),
        call(watchDeleteQuestionnaire),
        call(watchCopyQuestionnaire)]);
}

export default questionnaireManagementSagas;
