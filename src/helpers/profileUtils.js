import axios from 'axios';

const profileUpdate = (data) => {
    try {
        const localStorageData = JSON.parse(localStorage.getItem('user'));;
        console.log('Profile Util : ', localStorageData.token);
        console.log('Profile Util : ', data);
        return axios.post(`http://localhost:5000/profile`, data, { params: { token: localStorageData.token } })
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
        console.log('Profile Util error : ', error);
    }
}

export { profileUpdate };