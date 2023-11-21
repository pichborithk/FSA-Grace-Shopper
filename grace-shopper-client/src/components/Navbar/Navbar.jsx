/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import logo from '../../../images/4.png';
import { toast } from 'react-hot-toast';

export default function Navbar({ user, setToken, setUser }) {
  const [navShow, setNavShow] = useState(false);

  function handleLogout() {
    localStorage.removeItem('token');
    // alert(`Successfully logged out of ${user.name}'s profile`);
    setToken('');
    setUser({});
    toast.success('Logged out');
  }
  function toggleLinks() {
    setNavShow(!navShow);
  }

  return (
    <div className='navBar'>
      <div className='navHeader longNavHeader'>
        <div className='welcomeBanner'>
          <img className='moodiLogo' src={logo} alt='Logo' />
          <div className='welcomeBtn'></div>
        </div>
        {user.name && <p className='welcomeUser'>Welcome, {user.name}</p>}
        <button onClick={toggleLinks} className='navToggleBtn'>
          <i className='fas fa-bars'></i>
        </button>
      </div>
      <div className='longNav'>
        <Link className='navLink' to='/'>
          Home
        </Link>
        <Link className='navLink' to='/Products'>
          Products
        </Link>
        <Link className='navLink' to='/men'>
          Men
        </Link>
        <Link className='navLink' to='/women'>
          Women
        </Link>
        <Link className='navLink' to='/kids'>
          Kids
        </Link>
        {user.name && (
          <Link className='navLink' to='/Carts'>
            Cart
          </Link>
        )}
        {!user.name && (
          <Link className='navLink' to='/login'>
            Hello, Sign in
          </Link>
        )}
        {user.name && (
          <Link onClick={handleLogout} className='navLink' to='/'>
            Logout
          </Link>
        )}

        {user.name && (
          <p className='welcomeUser shortWelcome'>Welcome, {user.name}</p>
        )}
      </div>
      <div className='navHeader shortNavHeader'>
        {user.name && <p className='welcomeUser'>Welcome, {user.name}</p>}
        <div className='welcomeBanner'>
          <h1>Moodi</h1>
        </div>
      </div>
      <div className='noShowLong'>
        <div className={navShow ? 'shortNav' : 'shortNavShow'}>
          <Link className='navLink' to='/'>
            Home
          </Link>
          <Link className='navLink' to='/Products'>
            Products
          </Link>
          <Link className='navLink' to='/men'>
            Men
          </Link>
          <Link className='navLink' to='/women'>
            Women
          </Link>
          <Link className='navLink' to='/kids'>
            Kids
          </Link>
          {user.name && (
            <Link className='navLink' to='/Carts'>
              Cart
            </Link>
          )}
          {!user.name && (
            <Link className='navLink' to='/login'>
              Hello, Sign in
            </Link>
          )}
          {user.name && (
            <Link onClick={handleLogout} className='navLink' to='/'>
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
