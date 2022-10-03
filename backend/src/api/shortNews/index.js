import Router from 'koa-router';
import * as shortNewsCtrl from './shortNews.ctrl'; 
// import checkLoggedIn from '../../lib/checkLoggedIn'; 

const shortNews = new Router();

shortNews.get('/', shortNewsCtrl.list); //필드없으면 인기뉴스로
shortNews.get('/:id', shortNewsCtrl.getNewsById,shortNewsCtrl.read);

export default shortNews;