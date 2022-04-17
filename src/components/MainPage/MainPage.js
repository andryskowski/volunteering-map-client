import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Map from '../Map/Map';
import '../../scss/base/_main-page.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Legend from '../Legend/Legend';

function MainPage() {
  const USER = useContext(CurrentUserContext);
  const { t } = useTranslation();

  return (
    <>
      <div className="main-page">
        <h1 className="hello-header">
          {t('MainPage.1')}
          {' '}
          {USER.userInfo.name}
        </h1>
        <div>
          <Map />
          <Legend />
        </div>
      </div>
    </>
  );
}

export default MainPage;
