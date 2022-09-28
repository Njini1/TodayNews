import Router from 'koa-router';
import shortNews from './shortNews';
import auth from './auth';
import scrapNews from './scrapNews';
const api = new Router();

api.use('/shortNews', shortNews.routes());
api.use('/auth', auth.routes());
api.use('/scrapNews', scrapNews.routes());

export default api;