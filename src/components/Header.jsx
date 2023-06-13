import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Header = () => {
  const { isLogged, setIsLogged } = useGlobalContext();
  const navigate = useNavigate();

  // TODO maybe move this logic out to one place with log in logic
  const logOut = () => {
    localStorage.setItem('jwt', '');
    setIsLogged(false);
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="navigation-container">
        <div className="navigation-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
        {!isLogged && (
          <>
            <div className="navigation-item">
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </div>
            <div className="navigation-item">
              <Link to="/login" className="nav-link">
                Log in
              </Link>
            </div>
          </>
        )}
        {isLogged && (
          <>
            <div className="navigation-item">
              <Link to="/profile" className="nav-link">
                My profile
              </Link>
            </div>
            <div className="navigation-item" onClick={logOut}>
              <div className="nav-link">Log out</div>
            </div>
          </>
        )}
        <div className="navigation-item">
          <Link to="/locations" className="nav-link">
            Locations
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
