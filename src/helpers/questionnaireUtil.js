import axios from 'axios';

const getQuestionnaireUtil = (token) => {
    try {
        return axios.get(`http://localhost:5000/questionare`, { params: { token: token } })
            .then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Questionnaire GET Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('Questionnaire Management Util error : ', error);
    }
}

const addQuestionnaireUtil = (data) => {
    try {
        return axios.post(`http://localhost:5000/questionare/create-question`, {'questdata': data.question}, { params: { token: data.token } })
            .then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Questionnaire Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('Questionnaire Management Util error : ', error);
    }
}

const copyQuestionnaireUtil = (data) => {
    try {
        return axios.post(`http://localhost:5000/questionare/copy-question`, {'id': data.questId}, { params: { token: data.token } })
            .then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Questionnaire Util error : ', err);
                throw err[1];
            })
    } catch (error) {
        console.log('Questionnaire Management Util error : ', error);
    }
}

const reeditQuestionnaireUtil = (data) => {
    try {
        return axios.post(`http://localhost:5000/questionare/reedit-quest`, {'questdata': data.questData}, { params: { token: data.token } })
            .then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Questionnaire Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('Questionnaire Management Util error : ', error);
    }
}

const deleteQuestionnaireUtil = (data) => {
    try {
        return axios.post(`http://localhost:5000/questionare/delete-question`, {'id': data.id}, { params: { token: data.token } })
            .then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Questionnaire Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('Questionnaire Management Util error : ', error);
    }
}

export {
    addQuestionnaireUtil,
    reeditQuestionnaireUtil,
    getQuestionnaireUtil,
    deleteQuestionnaireUtil,
    copyQuestionnaireUtil
};