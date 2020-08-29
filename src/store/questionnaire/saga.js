import { takeEvery, put, all, call } from 'redux-saga/effects';

// Login Redux States
import questionnaire from './actionTypes';
import { apiError } from './actions';

// AUTH related methods
// import { setLoggeedInUser,postLogin } from '../../../helpers/authUtils';
import { addQuestionnaireSuccess, getQuestionnaireSuccess, deleteQuestionnaireSuccess, copyQuestionnaireSuccess } from '../.././helpers/questionnaireUtil';

//If user is login then dispatch redux action's are directly from here.
function* addQuestionnaireSuccesss( payload ) {
    try {
        console.log('Saga', payload.payload);
        const response = yield call(addQuestionnaireSuccess, payload.payload );
        console.log(response);
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchAddQuestionnaire() {
    yield takeEvery(questionnaire.ADD_QUESTIONNAIRE_SUCCESSFUL, addQuestionnaireSuccesss)
}

function* getQuestionnaireSuccesss() {
    try {
        console.log('Saga');
        const response = yield call(getQuestionnaireSuccess);
        console.log(response);
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchGetQuestionnaire() {
    yield takeEvery(questionnaire.GET_QUESTIONNAIRE_SUCCESSFUL, getQuestionnaireSuccesss)
}

function* deleteQuestionnaireSuccesss( id ) {
    try {
        console.log('Saga', id);
        const response = yield call(deleteQuestionnaireSuccess, id );
        console.log(response);
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchDeleteQuestionnaire() {
    yield takeEvery(questionnaire.DELETE_QUESTIONNAIRE_SUCCESSFUL, deleteQuestionnaireSuccesss)
}

function* copyQuestionnaireSuccesss( payload ) {
    try {
        console.log('Saga', payload.payload);
        const response = yield call(copyQuestionnaireSuccess, payload.payload );
        console.log(response);
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchCopyQuestionnaire() {
    yield takeEvery(questionnaire.COPY_QUESTIONNAIRE_SUCCESSFUL, copyQuestionnaireSuccesss)
}

function* questionnaireManagementSagas() {
    yield all([call(watchAddQuestionnaire),
            call(watchGetQuestionnaire),
            call(watchDeleteQuestionnaire),
            call(watchCopyQuestionnaire)]);
}

export default questionnaireManagementSagas;
