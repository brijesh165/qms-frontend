import axios from 'axios';

const localStorageData = JSON.parse(localStorage.getItem('user'));
const addUserSuccess = (data) => {
    try {
        return axios.post(`http://localhost:5000/create-user`, data.user_data, { params: { token: localStorageData.token } })
            .then(response => {
                console.log('User Management Util : ', response);
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

const deleteUserSuccess = async data => {
    try {
        const newData = {...data.user_data, "Delete": "True"};
        console.log('User Management Util', newData);
        return await axios.post(`http://localhost:5000/user-management`, newData, {params: {token: localStorageData.token}})
        .then((response) => {
            console.log('User Management Util : ', response);
            if (response.status === 400 || response.status === 500)
                throw response.data;
            return response.data;
        }).catch(err => {
            console.log('User Management Util error : ', err);
            throw err[1];
        })
    } catch (error) {
        console.log('User Management Util error : ', error);
    }
}

const changeUserRoleSuccess = async data => {
    try {
        const newData = {
                        "id": data.user_data._id,
                        "role": data.user_data.role,
                        "clearance": "True"
                        };
        console.log('User Management Util', newData);
        return await axios.post(`http://localhost:5000/user-management`, newData, {params: {token: localStorageData.token}})
        .then((response) => {
            console.log('User Management Util : ', response);
            if (response.status === 400 || response.status === 500)
                throw response.data;
            return response.data;
        }).catch(err => {
            console.log('User Management Util error : ', err);
            throw err[1];
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
        return await axios.post(`http://localhost:5000/user-management`, data.email_data, {params: {token: localStorageData.token}})
        .then((response) => {
            console.log('User Management Util : ', response);
            if (response.status === 400 || response.status === 500)
                throw response.data;
            return response.data;
        }).catch(err => {
            console.log('User Management Util error : ', err);
            throw err[1];
        })
    } catch (error) {
        console.log('User Management Util error : ', error);
    }
}

export { addUserSuccess, deleteUserSuccess, changeUserRoleSuccess, sendEmailSuccess };