import Dashboard from './pages/Dashboard/dashboard';



import Pageslogin from './pages/Auth/Login';
import Logout from './pages/Auth/Logout';
import Pagesregister from './pages/Auth/Register';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import UserManagement from './pages/user_management/management';
import Profile from './pages/profile/profile';
import Questionnaire from './pages/questionnaire/questionnaire';
import Responses from './pages/responses/responses';


const routes = [

    // public Routes
    { path: '/login', component: Pageslogin, ispublic: true },
    { path: '/logout', component: Logout, ispublic: true },
    { path: '/register', component: Pagesregister, ispublic: true },
    { path: '/forget-password', component: ForgetPassword, ispublic: true },
    { path: '/reset-password', component: ResetPassword, ispublic: true },
   
  

    { path: '/user-management', component: UserManagement },
    { path: '/profile', component: Profile },
    { path: '/questionnaire', component: Questionnaire },
    { path: '/responses', component: Responses },



    // Dashboard
    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Pageslogin, ispublic: true},


];

export default routes;