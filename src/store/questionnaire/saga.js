import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import questionnaire from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
import {searchQuestionnaireSuccess,
        addQuestionnaireSuccess, 
        getQuestionnaireSuccess, 
        deleteQuestionnaireSuccess, 
        reeditQuestionnaireSuccess,
        copyQuestionnaireSuccess } from '../.././helpers/questionnaireUtil';

//If user is login then dispatch redux action's are directly from here.
function* searchQuestionnaireSuccesss( {payload: questname} ) {
    try {
        console.log('Saga', questname);
        const response = yield call(searchQuestionnaireSuccess, questname );
        console.log(response);
        yield put({type: questionnaire.SEARCH_QUESTIONNAIRE_SUCCESSFUL,
                    payload: response})
    } catch (error) {
        console.log('ADD QUESTION ERROR', error);
        yield put(apiError(error));
    }
}

export function* watchSearchQuestionnaire() {
    yield takeEvery(questionnaire.SEARCH_QUESTIONNAIRE_START, searchQuestionnaireSuccesss)
}

function* addQuestionnaireSuccesss( payload ) {
    try {
        console.log('Saga', payload.payload);
        const response = yield call(addQuestionnaireSuccess, payload.payload );
        console.log(response);
        yield put({type: questionnaire.ADD_QUESTIONNAIRE_SUCCESSFUL,
                    payload: response})
    } catch (error) {
        console.log('ADD QUESTION ERROR', error);
        yield put(apiError(error));
    }
}

export function* watchAddQuestionnaire() {
    yield takeEvery(questionnaire.ADD_QUESTIONNAIRE_START, addQuestionnaireSuccesss)
}

function* reeditQuestionnaireSuccesss( payload ) {
    try {
        console.log('Saga', payload.payload);
        const response = yield call(reeditQuestionnaireSuccess, payload.payload );
        console.log(response);
        yield put({type: questionnaire.REEDIT_QUESTIONNAIRE_SUCCESSFUL,
                    payload: response})
    } catch (error) {
        console.log('REEDIT QUESTION ERROR', error);
        yield put(apiError(error));
    }
}

export function* watchReEditQuestionnaire() {
    yield takeEvery(questionnaire.REEDIT_QUESTIONNAIRE_START, reeditQuestionnaireSuccesss)
}

function* getQuestionnaireSuccesss() {
    try {
        const response = yield call(getQuestionnaireSuccess);
        if (response.data) {
            yield put({type: questionnaire.GET_QUESTIONNAIRE_SUCCESSFUL, 
                        payload: response.data})
        }
        // yield put(getquestionnairesuccessful(response));
        // yield put(getquestionnairesuccessful(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchGetQuestionnaire() {
    yield takeEvery(questionnaire.GET_QUESTIONNAIRE_START, getQuestionnaireSuccesss)
}

function* deleteQuestionnaireSuccesss( {payload: question_data }) {
    try {
        console.log('Saga', question_data);
        const response = yield call(deleteQuestionnaireSuccess, question_data );
        console.log('DELETE RESP : ', response);
        if (response.success) {
            yield put({type: questionnaire.DELETE_QUESTIONNAIRE_SUCCESSFUL,
                    payload: response.id})
        } else {
            yield put(apiError(response.error));
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchDeleteQuestionnaire() {
    yield takeEvery(questionnaire.DELETE_QUESTIONNAIRE_START, deleteQuestionnaireSuccesss)
}

function* copyQuestionnaireSuccesss( {payload : question_data} ) {
    try {
        console.log('Saga', question_data);
        const response = yield call(copyQuestionnaireSuccess, { question_data } );
        if (response) {
            console.log('COPY SUCCESS', response);
            yield put({type: questionnaire.COPY_QUESTIONNAIRE_SUCCESSFUL, 
                payload: response})
        } else {
            console.log('COPY ERROR');
            yield put(apiError(response.error));
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchCopyQuestionnaire() {
    yield takeEvery(questionnaire.COPY_QUESTIONNAIRE_START, copyQuestionnaireSuccesss)
}

function* questionnaireManagementSagas() {
    yield all([call(watchSearchQuestionnaire),
            call(watchAddQuestionnaire),
            call(watchGetQuestionnaire),
            call(watchReEditQuestionnaire),
            call(watchDeleteQuestionnaire),
            call(watchCopyQuestionnaire)]);
}

export default questionnaireManagementSagas;
