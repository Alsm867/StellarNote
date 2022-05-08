import React, { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('')

  const demoLogin = async () => {
    setCredential('demo@user.io');
    setPassword('password');
    return dispatch(
      sessionActions.login({credential: 'demo@user.io', password: 'password'}),
      history.push('/notes')
    ), toReload();

  }

  const toReload = () => {
    setTimeout(() => {

    window.location.reload()
  }, 100);
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton className="profile-user" user={sessionUser} />
    );
  } else {
    sessionLinks = (
        <div className='home-page'>
          <LoginFormModal className="login-form"/>
          <button className='demo' onClick={demoLogin}>Demo Login</button>
          <SignupFormModal className="signup-form"/>
        </div>
    );
  }



  return (
    <nav id='nav-tag'>
      <NavLink exact to="/">
        <img className="logo" src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637714769/Styckr/Stellar_1_xitwmb.png' alt="logo"/>
      </NavLink>
      <div className='isLoaded'>
        {isLoaded && sessionLinks}

      </div>

    </nav>

  );
}

export default Navigation;
