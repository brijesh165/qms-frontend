import axios from 'axios';

const getProfileUtil = (token) => {
    return axios.get("http://localhost:5000/profile", { params: { token: token } })
        .then((response) => {
            if (response.status === 400 || response.status === 500)
                throw response.data
            return response.data
        }).catch(error => {
            return error.response.data;
        })
}

const updateProfileUtil = (data) => {
    console.log('Profile Util : ', data);
    return axios.post(`http://localhost:5000/profile`, {data: data}, { params: { token: data.token } })
        .then(response => {
            console.log('Profile Utils : ', response);
            if (response.status === 400 || response.status === 500)
                throw response.data;
            return response.data;
        }).catch(err => {
            console.log('UPDATE Profile Util error : ', err.response);
            return err.response.data;
        })

}

const changePasswordUtil = (data) => {
    console.log('Profile Util : ', data.userpassword);
    return axios.post(`http://localhost:5000/profile/change-userpassword`, {userpassword: data.userpassword}, { params: { token: data.token } })
        .then(response => {
            console.log('Profile Utils : ', response);
            if (response.status === 400 || response.status === 500)
                throw response.data;
            return response.data;
        }).catch(err => {
            console.log('UPDATE Profile Util error : ', err.response);
            return err.response.data;
        })
}

export { getProfileUtil, updateProfileUtil, changePasswordUtil };