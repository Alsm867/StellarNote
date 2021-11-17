import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormModal from './components/SignupFormModal';
import LoginForm from "./components/LoginFormModal";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import FooterComponent from './components/FooterComponent';
import TheNotes from './components/NotesPageComponent';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <div className='all-home'>

            <div className='home-page1'>
            <div className='stellar'>Stellar <span className='note'> Note</span></div>
            </div>
            <div className='about-home'>
            <p >Got any bright ideas? Have some thoughts to jot down?
              Or maybe you just want to take some Stellar Notes? Simply create an account, and you can start today!</p>
            </div>
            </div>
          </Route>
          <Route exact path='/notes'>
            {sessionUser ? <TheNotes/> :
            <div className='not-logged-in'>
            <form className='form-in-login' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

          <label className='login-cred'>
            Username or Email <br/>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className='login-cred'>
            Password <br/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className='login-button' type="submit">Log In</button>
      </form></div>}
          </Route>
          <Route path="/login" >
            {/* <LoginFormPage /> */}
          </Route>
          <Route path='/signup'>
            {/* <SignupFormPage /> */}
          </Route>
        </Switch>
      )}
      <FooterComponent />
    </>
  );
}

export default App;
