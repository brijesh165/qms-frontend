import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));
const getUserListUtil = (token) => {
    try {
        console.log('GET USER LIST UTIL', token);
        return axios.get(`http://localhost:5000/user-management/users`, { params: { token: token } })
            .then((response) => {
                console.log('User Management GET Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                if (response.data.Role === 'SuperAdmin') {
                    return {
                        'users': [...response.data.SuperUser, ...response.data.Admins],
                        'status': response.data.status
                    }
                } else {
                    return {
                        'users': response.data.User,
                        status: response.data.status
                    }
                }
            })
            .catch((error) => {
                console.log('User Management Error : ', error);
                return error.response.data;
            })
    } catch (error) {
        console.log('User Management Util error : ', error)
    }
}

const getQuestionsUtil = (token) => {
    try {
        console.log('GET QUESTIONS LIST UTIL', token);
        return axios.get(`http://localhost:5000/questionare`, { params: { token: token } })
            .then((response) => {
                console.log('User Management GET Questions Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            })
            .catch((error) => {
                console.log('User Management Error : ', error);
                return error.response.data;
            })
    } catch (error) {
        console.log('User Management Util error : ', error)
    }
} 

const addUserUtil = (data) => {
    try {
        console.log('ADD USER UTIL : ', data);
        return axios.post(`http://localhost:5000/user-management/create-user`, data.user_data, { params: { token: data.token } })
            .then(response => {
                console.log('User Management ADD USER Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('Profile Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('User Management Util error : ', error);
    }
}

const deleteUserSuccess = async data => {
    try {
        console.log('User Management Util', data);
        return await axios.post(`http://localhost:5000/user-management/delete-user`, data.user_data, { params: { token: data.token } })
            .then((response) => {
                console.log('User Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('User Management Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('User Management Util error : ', error);
    }
}

const changeUserRoleSuccess = async data => {
    try {
        console.log('User Management Util', data);
        return await axios.post(`http://localhost:5000/user-management/change-role`, data.user_data, { params: { token: data.token } })
            .then((response) => {
                console.log('User Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response.data;
            }).catch(err => {
                console.log('User Management Util error : ', err);
                return err.response.data;
            })
    } catch (error) {
        console.log('User Management Util error : ', error);
    }
}

const sendEmailSuccess = async data => {
    try {
        // const newData = {
        //                 "sendusers": data.email_data.selectedEmail,
        //                 "sendsurvey": data.email_data.label,
        //                 "expirydate": data.email_data.expiresat,
        //                 "sendbody": data.email_data.sendbody,
        //                 "send": "True",
        //                 };
        console.log('User Management Util', data);
        return await axios.post(`http://localhost:5000/user-management`, data.email_data, { params: { token: localStorageData.token } })
            .then((response) => {
                console.log('User Management Util : ', response);
                if (response.status === 400 || response.status === 500)
                    throw response.status;
                return response;
            }).catch(err => {
                console.log('User Management Util error : ', err);
                throw err[1];
            })
    } catch (error) {
        console.log('User Management Util error : ', error);
    }
}

export { getUserListUtil, getQuestionsUtil, addUserUtil, deleteUserSuccess, changeUserRoleSuccess, sendEmailSuccess };