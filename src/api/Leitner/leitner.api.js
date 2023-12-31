import http from "../../helpers/http";

export const getLeiner = () => {
  return http.get("/leitners/levels");
};
export const getInfoVocabInLeitner = (params) => {
  return http.get("/leitners/vocab", params);
};
export const getAllVocabInALevel = (level) => {
  return http.get(`/leitners/${level}`);
};
export const updateVocabLeitnerLevel = (params) => {
  const { data, statusLevel } = params;
  return http.patch(`/leitners/levels/${statusLevel}`, data);
};
export const addVocabToLeitner = (data) => {
  return http.post(`/leitners`, data);
};
export const getLeitnerVocabs = (params) => {
  const { level, pos, limit, offset, keyword } = params;
  let url = `/leitners/${level}?offset=${offset}`;

  if (pos) {
    url = url + `&pos=${pos}`;
  }
  if (keyword) {
    url = url + `&keyword=${keyword}`;
  }
  if (limit) {
    url = url + `&limit=${limit}`;
  }
  return http.get(url);
};
export const deleteVocabInLeitner = (data) => {
  return http.delete(`/leitners/vocabs`, data);
};
export const getLeitnerData = (level) => {
  return http.get(`/leitners/levels/${level}/game`);
};
//
// /leitners/levels/{statusLevel}
export const changeLevelVocab = (data) => {
  const { statusLevel, params } = data;
  return http.patch(`/leitners/levels/${statusLevel}`, params);
};
