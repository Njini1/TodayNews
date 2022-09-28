import Router from 'koa-router';
import * as scrapCtrl from './scrapNews.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

// posts.get('/', scrapCtrl.list);
posts.get('/', checkLoggedIn, scrapCtrl.list); //로그인된 사용자의 스크랩뉴스만 불러와야함
posts.post('/', checkLoggedIn, scrapCtrl.write); //미들웨어 posts 라우터에서 사용
posts.get('/:id', checkLoggedIn, scrapCtrl.getPostById, scrapCtrl.read);
posts.delete('/:id', checkLoggedIn, scrapCtrl.getPostById, scrapCtrl.checkOwnPost, scrapCtrl.remove);
posts.patch('/:id', checkLoggedIn, scrapCtrl.getPostById, scrapCtrl.checkOwnPost, scrapCtrl.update);
export default posts;