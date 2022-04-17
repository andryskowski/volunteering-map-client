import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import '../../scss/base/_landing-page.scss';
import kids from '../../assets/kids.jpg';
import vmlogo from '../../assets/vm-logo.png';
import lodzlogo from '../../assets/lodz.svg';

function ViewPlaceForm() {
  const refContextContainer1 = useRef(false);
  const refContextContainer2 = useRef(false);
  const [heading, setHeading] = useState('Zaloguj/Zarejestruj się');
  const { t } = useTranslation();

  const changeView = () => {
    refContextContainer1.current.classList.toggle('display-none');
    refContextContainer2.current.classList.toggle('display-flex');
    if (refContextContainer1.current.classList.contains('display-none')) {
      setHeading('Powrót');
    }
    if (!refContextContainer2.current.classList.contains('display-flex')) {
      setHeading('Zaloguj/Zarejestruj się');
    }
  };

  return (
    <>
      <div className="landing-page">
        <div className="landing-page-container">
          <div ref={refContextContainer1} className="landing-page-container-context-1">
            <div className="header-container">
              <h1>Volunteering Map</h1>
            </div>
            <p>
              {t('LandingPage.1')}
            </p>
            <div className="see-for-yourself-header-container">
              <h4 className="see-for-yourself-header">{t('LandingPage.2')}</h4>
            </div>
            <div className="images-container">
              <div className="lodz-logo-container">
                <img className="lodz-logo img-landingpage" src={lodzlogo} alt="lodz-logo" />
              </div>
              <div className="img-kids-container">
                <img className="img-kids img-landingpage" src={kids} alt="kids" />
              </div>
              <div className="vm-logo-container">
                <img className="vm-logo img-landingpage" src={vmlogo} alt="vm-logo" />
              </div>
            </div>
          </div>
          <div ref={refContextContainer2} className="landing-page-container-context-2">
            <LoginForm translation={t} />
            <hr className="hr-1" />
            <RegisterForm translation={t} />
          </div>
          <div className="goback-container">
            <a
              onClick={() => {
                changeView();
              }}
            >
              {heading === 'Zaloguj/Zarejestruj się' ? t('LandingPage.3') : t('LandingPage.4')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPlaceForm;
