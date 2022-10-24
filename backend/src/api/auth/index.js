import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.post('/update', checkLoggedIn, authCtrl.updatePassword)

export default auth;
