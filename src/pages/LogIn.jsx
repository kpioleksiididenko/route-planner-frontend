import { useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';
import { useGlobalContext } from '../context';

const LogIn = () => {
  //TODO add check if user is already logged
  const { setIsLogged } = useGlobalContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await userApi.login(Object.fromEntries(formData));
    // TODO log in when signup maybe
    console.log({ response });
    if (response.ok) {
      const payload = await response.json();
      console.log({ data: payload });
      localStorage.setItem('jwt', payload.accesToken);
      setIsLogged(true);
      navigate('/profile');
      return;
    }
    // TODO add better error handling
    const data = await response.json();
    alert('Falied to signup:\n' + errorMsgToAlertMsg(data.message));
  };

  // msg can be both single string and array of strings
  // TODO maybe fix this
  const errorMsgToAlertMsg = (msg) => {
    if (typeof msg === 'string') {
      return msg;
    }
    return msg.join('\n');
  };

  return (
    <div className="login-container">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          name="email"
          id="login-email"
          placeholder="email@site.com"
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <input type="submit" value="Log in" className="input-btn" />
      </form>
    </div>
  );
};

export default LogIn;
