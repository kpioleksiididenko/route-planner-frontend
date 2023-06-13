import { useEffect, useState } from 'react';
import userApi from '../api/userApi';

const Profile = () => {
  const [user, setUser] = useState(undefined);

  const fetchUser = async () => {
    // TODO add error handling
    const response = await userApi.me();
    if (!response.ok) {
      setUser(undefined);
      return;
    }
    const user = await response.json();
    setUser(user);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (user === undefined) {
    return (
      <div className="user-profile-container">
        <p>Something went wrong, no profile</p>
      </div>
    );
  }
  console.log(user);
  return (
    <div className="user-profile-container">
      <div className="title">Your profile</div>
      <div className="profile-details">
        <div className="user-field">
          <span className="field-name">name:</span> {user.name}
        </div>
        <div className="user-field">
          <span className="field-name">username:</span> {user.username}
        </div>
        <div className="user-field">
          <span className="field-name">email:</span> {user.email}
        </div>
      </div>
    </div>
  );
};

export default Profile;
