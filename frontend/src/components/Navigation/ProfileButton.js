import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const notes = (e) => {
    e.preventDefault();
    history.push('/notes')
    // window.location.reload()
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button className='to-notes' onClick={notes}>Notes</button>

      <button className='log-out' onClick={logout}>Log Out</button>
    </>
  );
}

export default ProfileButton;
