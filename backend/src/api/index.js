import Router from 'koa-router';
import shortNews from './shortNews';
import auth from './auth';
import scrapNews from './scrapNews';
import myPage from './myPage';
const api = new Router();

api.use('/shortNews', shortNews.routes());
api.use('/auth', auth.routes());
// api.use('/scrapNews', scrapNews.routes());
api.use('/posts', scrapNews.routes());
api.use('/myPage',myPage.routes());

export default api;