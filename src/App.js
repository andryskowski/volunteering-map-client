/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import i18next from 'i18next';
import LandingPage from './components/LandingPage/LandingPage';
import PrivateRoute from './components/Router/PrivateRoute';
import PlacePage from './components/PlacePage/PlacePage';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import UserPanel from './components/UserPanel/UserPanel';
import Contact from './components/Contact/Contact';
import ListPlaces from './components/ListPlaces/ListPlaces';
import PlaceForm from './components/PlaceForm/PlaceForm';
import { PlacesContext } from './contexts/PlacesContext';
import UsersPanel from './components/UsersPanel/UsersPanel';
import PlacesPanel from './components/PlacesPanel/PlacesPanel';
import UserProfile from './components/UserProfile/UserProfile';
import { UsersContext } from './contexts/UsersContext';
import Messages from './components/Messages/Messages';
import MessagesPanel from './components/MessagesPanel/MessagesPanel';
import CommentsPanel from './components/CommentsPanel/CommentsPanel';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { AccessibleInterfaceContext } from './contexts/AccessibleInterfaceContext';

const CURRENT_USER = JSON.parse(window.localStorage.getItem('CURRENT_USER'));
const CURRENT_USER_ID = CURRENT_USER ? CURRENT_USER._id : false;

function App() {
  const PLACES = useContext(PlacesContext);
  const USERS = useContext(UsersContext);
  const elementAccessibleInterface = useRef(null); 
  const buttonChangeLanguage = useRef(null); 
  const { isAccessibleInterface, setIsAccesibleInterface } = useContext(AccessibleInterfaceContext);

  const changeLang = () => {
    if (i18next.resolvedLanguage === 'en')
    {
      i18next.changeLanguage('pl');
      buttonChangeLanguage.current.classList.remove('flag-poland');
      buttonChangeLanguage.current.classList.add('flag-gb');
    }
    else if (i18next.resolvedLanguage === 'pl')
    {
      i18next.changeLanguage('en');
      buttonChangeLanguage.current.classList.remove('flag-gb');
      buttonChangeLanguage.current.classList.add('flag-poland');
    }
  };

  const changeInterface = () => {
    if (isAccessibleInterface === true) {
      setIsAccesibleInterface(false);
      elementAccessibleInterface.current.classList.remove('accessible-interface');
    }
    else
    {
      setIsAccesibleInterface(true);
      elementAccessibleInterface.current.classList.add('accessible-interface');
    }
  };

  return (
    <>
      <div ref={elementAccessibleInterface} className={isAccessibleInterface ? 'accessible-interface' : null}>
        <Router>
          <AnimatePresence exit={{ opacity: 0 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {CURRENT_USER_ID ? <PrivateRoute path="/" component={Navbar} /> : false}

              <div className="fixed-buttons">
                <div className="container-button-changelang">
                  <button
                    ref={buttonChangeLanguage}
                    onClick={() => { changeLang(); }}
                    className={i18next.resolvedLanguage === 'pl' ? 'button-changelang flag-gb'
                      : 'button-changelang flag-poland'} 
                  />
                </div>
                <div className="container-button-changeinterface">
                  <button onClick={() => { changeInterface(); }} className="button-changeinterface" />
                </div>
              </div>

              <ScrollToTop>
                <Switch>
                  {CURRENT_USER_ID ? (
                    <PrivateRoute exact path="/" component={MainPage} />
                  ) : (
                    <Route exact path="/" component={LandingPage} />
                  )}
                  {CURRENT_USER_ID ? <PrivateRoute exact path="/messages" component={Messages} /> : false}
                  {CURRENT_USER_ID ? <PrivateRoute exact path="/messagespanel" component={MessagesPanel} /> : false}
                  {CURRENT_USER_ID ? <PrivateRoute exact path="/commentspanel" component={CommentsPanel} /> : false}
                  {CURRENT_USER_ID ? <PrivateRoute exact path={`/edit/${CURRENT_USER_ID}`} component={UserPanel} /> : false}
                  {CURRENT_USER_ID ? <PrivateRoute exact path="/userProfile" component={UserProfile} /> : false}
                  {PLACES ? PLACES.map((place) => (
                    <PrivateRoute
                      exact
                      path={`/${place._id}`}
                      component={() => <PlacePage placeId={place._id} />}
                    />
                  )) : false}
                  {USERS ? USERS.map((user) => (
                    <PrivateRoute
                      exact
                      path={`/${user._id}`}
                      component={() => <UserProfile userId={user._id} />}
                    />
                  )) : false}
                  {CURRENT_USER_ID ? <PrivateRoute path="/contact" component={Contact} /> : false}
                  {CURRENT_USER_ID ? <PrivateRoute path="/listplaces" component={ListPlaces} /> : false}
                  {CURRENT_USER_ID ? <PrivateRoute path="/addplace" component={PlaceForm} /> : false}
                  {(CURRENT_USER_ID && CURRENT_USER.role === 'moderator') || (CURRENT_USER_ID && CURRENT_USER.role === 'admin')
                    ? <PrivateRoute path="/userspanel" component={UsersPanel} /> : false}
                  {(CURRENT_USER_ID && CURRENT_USER.role === 'moderator') || (CURRENT_USER_ID && CURRENT_USER.role === 'admin')
                    ? <PrivateRoute path="/placespanel" component={PlacesPanel} /> : false}
                </Switch>
              </ScrollToTop>
            </motion.div>
          </AnimatePresence>
        </Router>
      </div>
    </>
  );
}

export default App;
