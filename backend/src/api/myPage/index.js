import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as myPageCtrl from './myPage.ctrl';
import * as shortNewsCtrl from '../shortNews/shortNews.ctrl'; 


const myPage =  new Router();

myPage.post('/saveNews/:id', checkLoggedIn, shortNewsCtrl.getNewsById, myPageCtrl.saveNews);
// 저장한 요약 뉴스 가져오기
myPage.get('/saveNews', checkLoggedIn, myPageCtrl.list);
export default myPage;