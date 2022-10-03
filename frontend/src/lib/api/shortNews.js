import client from './client';
//posts->shortNews
import qs from 'qs';
export const readNews = (id) => client.get(`/api/shortNews/${id}`);

export const listNews = ({ field, username, page }) => {
  return client.get(`/api/shortNews`, {
    params: { field, username, page },
  });
  // return client.get(`/api/shortNews/?field=${queryString}`);
};


// export const listNews = ({ field, username, page }) => {
//   const queryString = qs.stringify({
//     field,
//     username,
//     page,
//   });
//   console.log("listNews의 queryString", queryString);
//   return client.get(`/api/?field=${queryString}`);
//   // return client.get(`/api/shortNews/?field=${queryString}`);
// };




// export const listNews = ({ field, username, page }) => {
//   return client.get(`/api/shortNews`, {
//     params: { field, username, page },
//   });
// };

/*
export const updateNews = ({ id, title, body}) =>
  client.patch(`/api/shortNews/${id}`, {
    title,
    body,
  });

export const removeNews = (id) => client.delete(`/api/shortNews/${id}`);*/
