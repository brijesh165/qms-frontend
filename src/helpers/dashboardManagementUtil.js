import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));

const getSurveySuccess = (token) => {
    try {
        console.log('Questionnaire GET', localStorageData);
        return axios.get(`http://localhost:5000/dashboard`, {params: {token: token}})
        .then(response => {
            console.log('Dashboard Management Util : ', response);
            if (response.status === 400 || response.status === 500)
                throw response.data;
            return response.data;
        }).catch(err => {
            console.log('Dashboard Util error : ', err);
            throw err[1];
        })    
    } catch (error) {
        console.log('Dashboard Management Util error : ', error);
    }
}

const getUserSurveyUtil = (token) => {
    try {
        console.log('Questionnaire USER GET', token);
        return axios.get(`http://localhost:5000/dashboard`, {params: {token: token}})
            .then(response => {
                console.log('Dashboard Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Dashboard Util error : ', err);
                throw err[1];
            })
    } catch (error) {
        console.log('Dashboard Util Error : ', error);
    }
}

const getAdminSurveyUtil = (token) => {
    try {
        console.log('Questionnaire GET',);
        return axios.get(`http://localhost:5000/dashboard`, {params: {token: token}})
            .then(response => {
                console.log('Dashboard Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Dashboard Util error : ', err);
                throw err[1];
            })
    } catch (error) {
        console.log('Dashboard Util Error : ', error);
    }
}

const endSurveySuccess = (data) => {
    try {
        const newData = {
            "questid": data,
            "surveyStatus": "True"
        }
        console.log('Questionnaire END', newData);
        return axios.post(`http://localhost:5000/dashboard`, newData, {params: {token: localStorageData.token}})
            .then(response => {
                console.log('Dashboard Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Dashboard Util error : ', err);
                throw err[1];
            })
    } catch (error) {
        console.log('Dashboard Management Util error : ', error);
    }
}

const downloadSurvetSuccess = (data) => {
    try {
        const newData = {
            "questid": data,
            "download": "True"
        }
        console.log('Questionnaire DOWNLOAD', newData);
        return axios.post(`http://localhost:5000/dashboard`, newData, { params: { token: localStorageData.token } })
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

export {getSurveySuccess, getUserSurveyUtil, getAdminSurveyUtil, 
        endSurveySuccess, downloadSurvetSuccess, fillQuestionUtil,
        submitQuestionUtil };