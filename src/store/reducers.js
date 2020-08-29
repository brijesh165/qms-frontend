import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';
import Reset from './auth/resetpwd/reducer';
import Profile from './profile/reducer';
import userManagement from './userManagement/reducer';
import questionnaireManagement from './questionnaire/reducer';

const rootReducer = combineReducers({

    // public
    Layout,

    // Authentication
    Account,
    Login,
    Forget,
    Reset,
    Profile,
    userManagement,
    questionnaireManagement
});

export default rootReducer;