import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));

const getQuestionaireUtil = (token) => {
    try {
        console.log('GET QUESTIONAIRE UTIL : ', token);
        return axios.get(`http://localhost:5000/questionare`, {params: {token: token}})
        .then(response => {
            console.log('RESPONSE : ', response);
            if (response.status === 402 || response.status === 300)
                throw response.data;
            return response.data;
        }).catch(err => {
            console.log('Dashboard Management Util error : ', err);
            return err.response;
        })   
    } catch (error) {
        console.log('Dashboard Management Util error : ', error);
    }
}

const getAdminQuestionaireUtil = (token) => {
    try {
        console.log('Questionnaire GET', token);
        return axios.all([
            axios.get(`http://localhost:5000/questionare`, {params: {token: token}}),
            axios.get(`http://localhost:5000/dashboard/responses`, {params: {token: token}})
        ]).then(axios.spread((questionare, responses) => {
            const data = {
                questionare: questionare.data,
                responses: responses.data
            }
            if (questionare.status === 400 || questionare.status === 500 || responses.status === 400 || responses.status === 500)
                throw data
            return data;
        })).catch(error => {
            const message = "Authorisation Error";
            return message;
        })
    } catch (error) {
        console.log('Dashboard Util Error : ', error);

    }
}

const getUserQuestionaireUtil = (token) => {
    try {
        console.log('Questionnaire USER GET', token);
        return axios.get(`http://localhost:5000/dashboard/responses`, {params: {token: token}})
            .then(response => {
                console.log('Dashboard USER Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Dashboard User Util error : ', err.response.data.message);
                return err.response.data.message;
            })
    } catch (error) {
        console.log('Dashboard Util Error : ', error);
    }
}

const endSurveyUtil = (data) => {
    try {
        console.log('Questionnaire END', data);
        return axios.post(`http://localhost:5000/dashboard/change-surveystatus`, {"questid": data.id}, {params: {token: data.token}})
            .then(response => {
                console.log('Dashboard Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Dashboard Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('Dashboard Management Util error : ', error);
    }
}

const downloadSurveyUtil = (data) => {
    try {
        console.log('Questionnaire DOWNLOAD', data.questId, data.token);
        return axios.post(`http://localhost:5000/dashboard/download-response`, {"questid": data.questId}, { params: { token: data.token } })
            .then(response => {
                console.log('Profile Utils : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Profile Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('Dashboard Management Util error : ', error);
    }
}

const fillQuestionUtil = (data) => {
    try {
        console.log('DASHBOARD MANAGEMENT | FILL QUESTION DATA', data);
        return axios.post(`http://localhost:5000/dashboard`, data, { params: { token: localStorageData.token } })
            .then(response => {
                console.log('Profile Utils : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Profile Util error : ', err);
                throw err[1];
            })
    } catch (error) {
        console.log('Dashboard Management Util error : ', error);
    }
}

const submitQuestionUtil = (data) => {
    try {
        console.log('DASHBOARD MANAGEMENT | SUBMIT QUESTION DATA', data);
        return axios.post(`http://localhost:5000/dashboard`, data, { params: { token: localStorageData.token } })
            .then(response => {
                console.log('Profile Utils : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Profile Util error : ', err);
                throw err[1];
            })
    } catch (error) {
        console.log('Dashboard Management Util error : ', error);
    }
}

export {getQuestionaireUtil, getAdminQuestionaireUtil, getUserQuestionaireUtil, 
    endSurveyUtil, downloadSurveyUtil, fillQuestionUtil,
        submitQuestionUtil };