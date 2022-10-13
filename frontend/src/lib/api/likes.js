import client from './client';
/*
export const readNews = (id) => client.get(`/api/shortNews/${id}`);

export const listNews = ({ field, username, page }) => {
  return client.get(`/api/shortNews`, {
    params: { page, username, field },
  });
};
*/
//일단 막적어봐,,,ㅋ
export const readLikes = (likes) => client.get(`/api/shortNews/${likes}`);
export const listLikes = ({ username, likes }) => {
  return client.get(`/api/shortNews`, {
    params: { username, likes },
  });
};
