import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as myPageCtrl from './myPage.ctrl';
import * as shortNewsCtrl from './shortNews.ctrl'; 


const myPage =  new Router();

myPage.post('/saveNews/:id', checkLoggedIn, shortNewsCtrl.getNewsById, myPageCtrl.update);
export default myPage;