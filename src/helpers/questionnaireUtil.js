import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));
const addQuestionnaireSuccess = (data) => {
    try {
        console.log('Questionnaire Data', data);
        return axios.post(`http://localhost:5000/questionare`, data, { params: { token: localStorageData.token } })
            .then(response => {
                console.log('Questionnaire Management Util : ', response);
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

const getQuestionnaireSuccess = () => {
    try {
        console.log('Questionnaire GET',);
        return axios.get(`http://localhost:5000/questionare`, {params: {token: localStorageData.token, questget: "True"}})
            .then(response => {
                console.log('Questionnaire Management Util : ', response);
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

const deleteQuestionnaireSuccess = (id) => {
    try {
        console.log('Questionnaire DELETE',);
        return axios.post(`http://localhost:5000/questionare`, id, {params: {token: localStorageData.token}})
            .then(response => {
                console.log('Questionnaire Management Util : ', response);
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

const copyQuestionnaireSuccess = (data) => {
    try {
        console.log('Questionnaire Data', data);
        return axios.post(`http://localhost:5000/questionare`, data, { params: { token: localStorageData.token } })
            .then(response => {
                console.log('Questionnaire Management Util : ', response);
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

export { addQuestionnaireSuccess, getQuestionnaireSuccess, deleteQuestionnaireSuccess, copyQuestionnaireSuccess };