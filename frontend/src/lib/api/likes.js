import client from './client';

export const setLike = (id) => client.post(`/api/shortNews/like/${id}`);
/*
  export const setLike = ({ newsId, username }) => {
  return client.get(`/api/shortNews/like/${newsId}`, {
    params: { username },
    });
  };
 */

export const cancleLike = (id) =>
  client.post(`/api/shortNews/cancleLike/${id}`);

//임시
//export const checkLike = (id) => client.post(`/api/shortNews/checkLike/${id}`);
//export const likeUser = (id) => client.post(`/api/shortNews/likeUser/${id}`);
