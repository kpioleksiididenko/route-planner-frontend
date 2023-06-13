import { useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await userApi.signup(Object.fromEntries(formData));
    // TODO log in when signup maybe
    console.log({ response });
    if (response.ok) {
      navigate('/');
      return;
    }
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
    <div className="signup-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="signup-username">Username</label>
        <input
          type="text"
          name="username"
          id="signup-username"
          placeholder="username"
        />
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          name="email"
          id="signup-email"
          placeholder="email@site.com"
        />
        <label htmlFor="signup-name">Name</label>
        <input
          type="text"
          name="name"
          id="signup-name"
          placeholder="your name"
        />
        <label htmlFor="signup-password">Password</label>
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Sign up" className="input-btn" />
      </form>
    </div>
  );
};

export default SignUp;
