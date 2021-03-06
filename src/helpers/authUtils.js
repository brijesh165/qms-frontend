import axios from 'axios';

//Set the logged in user data in local session 
const setLoggeedInUserUtil = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

// Gets the logged in user data from local session 
const getLoggedInUser = () => {
    const user = localStorage.getItem('user');
    if (user)
        return JSON.parse(user);
    return null;
}

//is user is logged in
const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
}

// Register Method
const postRegister = (url, data) => {
    return axios.post(url, data).then(response => {
        if (response.status >= 200 || response.status <= 299)
            return response.data;
        throw response.data;
    }).catch(err => {
        var message;
        if (err.response && err.response.status ) {
            switch (err.response.status) {
                case 404: message = "Sorry! the page you are looking for could not be found"; break;
                case 500: message = "Sorry! something went wrong, please contact our support team"; break;
                case 401: message = "Invalid credentials"; break;
                default: message = err[1]; break;
            }
        }
        throw message;
    });

}

// Login Method
const loginUserUtil = (data) => {
    return axios.post(`http://localhost:5000/login`, data).then(response => {
        if (response.status === 402 || response.status === 300)
            throw response.message;
        return response.data;
    }).catch(err => {
        console.log('App Util error : ',err.response);
        return err.response.data;
    });
}

// postForgetPwd 
const forgetPasswordUtil = (data) => {
    return axios.post(`http://localhost:5000/forget-password`, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        return err.response.data
    });
}

// postResetPwd 
const postResetPwd = (data) => {
    return axios.post(`http://localhost:5000/reset-password`, data).then(response => {
        if (response.status === 400 || response.status === 500)
        {throw response.data;}
        
        return response.data;
    }).catch(err => {
        return err.response.data
    });
}

export { setLoggeedInUserUtil, 
        getLoggedInUser, 
        isUserAuthenticated, 
        postRegister, 
        loginUserUtil, 
        forgetPasswordUtil, 
        postResetPwd }