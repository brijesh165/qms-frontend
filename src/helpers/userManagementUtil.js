import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));
const addUserSuccess = (data) => {
    try {
        return axios.post(`http://localhost:5000/create-user`, data.user_data, { params: { token: localStorageData.token } })
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
        console.log('User Management Util error : ', error);
    }
}

export { addUserSuccess };