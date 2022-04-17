import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Parser from 'html-react-parser';
import { UsersContext } from '../../contexts/UsersContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { postConversation, findConversation } from '../../actions/FetchData';
import '../../scss/base/_user-panel.scss';

function UserProfile(props) {
  const { userId } = props;
  const users = useContext(UsersContext);
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const [currentConversation, setCurrentConversation] = useState(null);
  const history = useHistory();
  const { t } = useTranslation();

  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

  useEffect(() => {
    const currentUser = users.filter((user) => user._id === userId);
  }, [userId, users]);

  useEffect(() => {
    if (currentConversation) {
      history.push('/messages', { conversation: currentConversation });
    }
  }, [currentConversation, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchMyDataIfConversationExists = async () => {
      const response = await findConversation(props.userId, CURRENT_USER._id);
      if (response) {
        setCurrentConversation(response);
      } else {
        const fetchMyDataIfConversationNotExists = async () => {
          await postConversation(CURRENT_USER._id, props.userId);
          const response2 = await findConversation(props.userId, CURRENT_USER._id);
          setCurrentConversation(response2);
        };
        fetchMyDataIfConversationNotExists();
      }
    };
    fetchMyDataIfConversationExists();
  };

  return (
    <>
      <div className="page-container">
        <div className="user-info">
          {users
            .filter((user) => user._id === userId)
            .map((user) => (
              <>
                <h2>{t('UserProfile.1')}</h2>
                <div>
                  <img
                    className="user-profilephoto"
                    src={user.profilePhoto}
                    width="150"
                    height="150"
                    alt="Error no profile phot"
                  />
                </div>
                <p>
                  <b>
                    {t('UserProfile.2')}
                    {' '}
                  </b>
                  <span style={setRoleStyle(user.role)}>{user.role}</span>
                </p>
                <input
                  key="submit"
                  id="send"
                  type="submit"
                  value={t('UserProfile.3')}
                  className="submit"
                  onClick={handleSubmit}
                />
                <p>
                  <b>
                    {t('UserProfile.4')}
                    {' '}
                  </b>
                  {user.name}
                </p>
                <p>
                  <b>
                    {t('UserProfile.5')}
                    {' '}
                  </b>
                  {user.date.substring(0, 10)}
                  <b>
                    {t('UserProfile.6')}
                    {' '}
                  </b>
                  {user.date.substring(11, 16)}
                </p>
                <p>
                  <b>
                    {t('UserProfile.7')}
                    {' '}
                  </b>
                  {user.email}
                </p>
                <p>
                  <b>
                    {t('UserProfile.8')}
                    {' '}
                  </b>
                  {user.description ? Parser(user.description) : 'brak opisu'}
                </p>
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
