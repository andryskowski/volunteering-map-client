import React, {
  useContext, useRef,
} from 'react';
import '../../scss/base/_common.scss';
import '../../scss/base/_navbar.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { AccessibleInterfaceContext } from '../../contexts/AccessibleInterfaceContext';

function logOut() {
  window.localStorage.removeItem('CURRENT_USER');
  window.location = '/';
  alert('log out');
}

function Navbar() {
  const currentUser = useContext(CurrentUserContext);
  const xButton = useRef(null);
  const navbarList = useRef(null);
  const { isAccessibleInterface } = useContext(AccessibleInterfaceContext);
  const { t } = useTranslation();

  const toggleNavbarList = () => {
    navbarList.current.classList.toggle('display-flex');
    xButton.current.classList.toggle('background-x-navbar');
  };

  return (
    <>
      <div className={isAccessibleInterface ? 'navbar accessible-interface-navbar' : 'navbar'}>
        <div className="button-x-navbar-conainer">
          <svg className="button-x-navbar" alt="button-navbar error" src="../../assets/burger_icon.svg" ref={xButton} onClick={toggleNavbarList} />
        </div>
        <ul ref={navbarList} className="navbar-list">
          <Link to="/"><li>{t('Navbar.1')}</li></Link>
          <Link to="/listplaces"><li>{t('Navbar.2')}</li></Link>
          <Link to="/addplace"><li>{t('Navbar.3')}</li></Link>
          <Link to="/contact"><li>{t('Navbar.4')}</li></Link>
          <li>{t('Navbar.5')}</li>
          {currentUser.userInfo.role === 'admin' || currentUser.userInfo.role === 'admin'
            ? <Link to="/userspanel"><li>{t('Navbar.6')}</li></Link> : false}
          {currentUser.userInfo.role === 'admin' || currentUser.userInfo.role === 'admin'
            ? <Link to="/placespanel"><li>{t('Navbar.7')}</li></Link> : false}
          {currentUser.userInfo.role === 'admin' || currentUser.userInfo.role === 'admin'
            ? <Link to="/commentspanel"><li>{t('Navbar.8')}</li></Link> : false}
          <Link to="/messagespanel"><li>{t('Navbar.9')}</li></Link>
          <Link to={`/edit/${currentUser.userInfo._id}/`}><li>{t('Navbar.10')}</li></Link>
          <li onClick={logOut}>{t('Navbar.11')}</li>
          {isAccessibleInterface ? null : (
            <div className="small-profilephoto-container">
              <div>
                <img width="35px" height="35px" src={currentUser.userInfo.profilePhoto} alt="profile img" />
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
