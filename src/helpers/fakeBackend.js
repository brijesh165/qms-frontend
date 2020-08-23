import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let users = [
  { id: 1, username: 'admin', password: 'admin', email: 'admin@qms.com', role: 'admin', token: 'abcdfef' },
  { id: 1, username: 'user', password: 'user', email: 'user@qms.com', role: 'enduser', token: 'user' },
  { id: 1, username: 'superadmin', password: 'superadmin', email: 'superadmin@qms.com', role: 'superadmin', token: 'superadmin' }
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(axios);

  mock.onPost('/post-register').reply(function (config) {

    const user = JSON.parse(config['data']);
    users.push(user);

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve([200, user]);
      });
    });
  });

  mock.onPost('/post-login').reply(function (config) {
    console.log('Fake backend', config);
    const user = JSON.parse(config['data']);
    const validUser = users.filter(usr => usr.email === user.username && usr.password === user.password);

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (validUser['length'] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([400, "ユーザー名とパスワードが無効です。正しいユーザー名とパスワードを入力してください。"]);
        }
      });
    });
  });

  mock.onPost('/forget-pwd').reply(function (config) {
   // User needs to check that user is eXist or not and send mail for Reset New password

   return new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve([200, "Check you mail and reset your password."]);
    });
  });

  });

}

export default fakeBackend;
