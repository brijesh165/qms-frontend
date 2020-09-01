import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));

const getSurveySuccess = () => {
    try {
        console.log('Questionnaire GET',);
        return axios.get(`http://localhost:5000/dashboard`, {params: {token: localStorageData.token}})
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

export {getSurveySuccess};