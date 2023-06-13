import ky from 'ky';

// TODO change
const BASE_URL = 'http://localhost:3001/api';

const fetchFromApi = async (apiPath, config) => {
  return await ky(apiPath, {
    ...config,
    prefixUrl: BASE_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
  });
};

// data is optional
const callApi = async (path, method, data) => {
  try {
    const response = await fetchFromApi(path, {
      method,
      json: data,
    });
    return response;
  } catch (e) {
    //TODO fix: when timeout it returns undefined
    return e.response;
  }
};

const post = async (path, data) => {
  return callApi(path, 'POST', data);
};

const get = async (path) => callApi(path, 'GET', undefined);

const api = { post, get };
export default api;
