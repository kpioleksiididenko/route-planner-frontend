import api from './util';

const signup = async (signupData) => await api.post('signup', signupData);

const login = async (logInData) => await api.post('login', logInData);

const me = async () => await api.get('users/me');

const isLogged = async () => {
  // TODO handle another situations
  const response = await me();
  return response.ok;
};

const functions = { signup, login, me, isLogged };
export default functions;
