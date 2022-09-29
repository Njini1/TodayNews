import client from './client';
//posts->shortNews
import qs from 'qs';
export const readNews = (id) => client.get(`/api/shortNews/${id}`);

export const listNews = ({ shortNewsField, username, page }) => {
  const queryString = qs.stringify({
    shortNewsField,
    username,
    page,
  });
  console.log("listNews의 queryString", queryString);
  return client.get(`/api/shortNews/?field=${queryString}`);
};

/*
export const listNews = ({ page, username, tag }) => {
  return client.get(`/api/shortNews`, {
    params: { page, username, tag },
  });
};

export const updateNews = ({ id, title, body}) =>
  client.patch(`/api/shortNews/${id}`, {
    title,
    body,
  });

export const removeNews = (id) => client.delete(`/api/shortNews/${id}`);*/
