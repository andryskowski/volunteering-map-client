import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Parser from 'html-react-parser';
import UpdateUser from './UpdateUser';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { setRoleStyle } from '../../actions/CommonFunctions';
import '../../scss/base/_user-panel.scss';

function UserPanel() {
  const CURRENT_USER = useContext(CurrentUserContext);
  const { t } = useTranslation();

  return (
    <>
      <div className="page-container">
        <h2>{t('UserPanel.1')}</h2>
        <div className="user-info">
          <div>
            <img src={CURRENT_USER.userInfo.profilePhoto} className="user-profilephoto" width="150" height="150" alt="Error no profile phot" />
          </div>
          <p>
            <b>
              {t('UserPanel.2')}
              {' '}
            </b>
            <span style={setRoleStyle(CURRENT_USER.userInfo.role)}>{CURRENT_USER.userInfo.role}</span>
          </p>
          <p>
            <b>
              {t('UserPanel.3')}
              {' '}
            </b>
            {CURRENT_USER.userInfo.name}
          </p>
          <p>
            <b>
              {t('UserPanel.4')}
              {' '}
            </b>
            {CURRENT_USER.userInfo.date.substring(0, 10)}
            <b>
              {t('UserPanel.5')}
              {' '}
            </b>
            {CURRENT_USER.userInfo.date.substring(11, 16)}
          </p>
          <p>
            <b>
              {t('UserPanel.6')}
              {' '}
            </b>
            {CURRENT_USER.userInfo.email}
          </p>
          <p>
            <b>
              {t('UserPanel.7')}
              {' '}
            </b>
            {CURRENT_USER.userInfo.description ? Parser(CURRENT_USER.userInfo.description) : 'brak opisu'}
          </p>
        </div>
        <UpdateUser />
      </div>
    </>
  );
}

export default UserPanel;
