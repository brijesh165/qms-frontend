import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));
const searchQuestionnaireSuccess = (data) => {
    try {
        const newData = {
            'questname': data,
            'searchquest': 'True'
        };
        console.log(newData);
        return axios.post(`http://localhost:5000/questionare`, newData, { params: { token: localStorageData.token } })
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

const reeditQuestionnaireSuccess = (data) => {
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

const deleteQuestionnaireSuccess = (data) => {
    try {
        const newData = {
            remove: "True",
            id: data
        };
        console.log('Questionnaire Data', newData);
        return axios.post(`http://localhost:5000/questionare`, newData, {params: {token: localStorageData.token}})
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
        const newData = {
            copy: "True",
            id: data.question_data
        };
        console.log('Questionnaire Data', newData);
        return axios.post(`http://localhost:5000/questionare`, newData, { params: { token: localStorageData.token } })
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

export { searchQuestionnaireSuccess, 
        addQuestionnaireSuccess, 
        reeditQuestionnaireSuccess,
        getQuestionnaireSuccess, 
        deleteQuestionnaireSuccess, 
        copyQuestionnaireSuccess };