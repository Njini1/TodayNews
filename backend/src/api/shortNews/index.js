import Router from 'koa-router';
import * as shortNewsCtrl from './shortNews.ctrl'; 
import checkLoggedIn from '../../lib/checkLoggedIn'; 

const shortNews = new Router();

shortNews.get('/', shortNewsCtrl.list); //필드없으면 인기뉴스로
shortNews.get('/:id', shortNewsCtrl.getNewsById,shortNewsCtrl.read);
shortNews.post('/like/:id', checkLoggedIn, shortNewsCtrl.getNewsById, shortNewsCtrl.setLike)
shortNews.post('/cancleLike/:id', checkLoggedIn, shortNewsCtrl.getNewsById, shortNewsCtrl.cancleLike)
shortNews.post('/dislike/:id', checkLoggedIn, shortNewsCtrl.getNewsById, shortNewsCtrl.setDislike)
shortNews.post('/cancleDislike/:id', checkLoggedIn, shortNewsCtrl.getNewsById, shortNewsCtrl.cancleDislike)

export default shortNews;