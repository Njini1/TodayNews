import client from './client';

export const readNews = (id) => client.get(`/api/shortNews/${id}`);

export const listNews = ({ field, username, page }) => {
  return client.get(`/api/shortNews`, {
    params: { page, username, field },
  });
};
