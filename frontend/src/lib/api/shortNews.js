import client from './client';

export const readNews = (id) => client.get(`/api/shortNews/${id}`);

export const listNews = ({ field, username, page }) => {
  return client.get(`/api/shortNews`, {
    params: { page, username, field },
  });
};

//요약 뉴스 저장
export const saveNews = (
  { username, newsId }, //id = newsId
) => client.post(`/api/myPage/saveNews/${newsId}`, { username, newsId });

export const listSaveNews = ({ username, page, id, newsId }) => {
  return client.get(`/api/myPage/saveNews`, {
    params: { page, username, id, newsId },
  });
};

export const deleteSaveNews = (saveNewsId) =>
  client.delete(`/api/myPage/saveNews/${saveNewsId}`);
