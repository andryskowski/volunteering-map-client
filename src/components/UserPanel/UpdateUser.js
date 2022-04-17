import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import { updateUser } from '../../actions/FetchData';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import UpdatePassword from './UpdatePassword';
import '../../scss/base/_update-user.scss';

function UserPanel() {
  const CURRENT_USER = useContext(CurrentUserContext);
  const [newProfilePhoto, setNewProfilePhoto] = useState(CURRENT_USER.userInfo.profilePhoto);
  const [newUsername, setNewUsername] = useState(CURRENT_USER.userInfo.name);
  const [newEmail, setNewEmail] = useState(CURRENT_USER.userInfo.email);
  const [description, setDescription] = useState('');
  const [updatePasswordPanelVisible, setUpdatePasswordPanelVisible] = useState(false);
  const { t } = useTranslation();

  function handleChange(event) {
    if (event.target.name === 'profilePhoto') {
      setNewProfilePhoto(event.target.value);
    } else if (event.target.name === 'username') {
      setNewUsername(event.target.value);
    } else if (event.target.name === 'email') {
      setNewEmail(event.target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    updateUser(newProfilePhoto, newUsername, newEmail, CURRENT_USER.userInfo._id, description);
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color',
  ];

  const modules = {
    toolbar: [
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image', 'video', 'header', [{
        color: ['#FF0000', '#001F3F', '#0074D9', '#7FDBFF',
          '#39CCCC', '#3D9970', '#2ECC40', '#01FF70',
          '#FFDC00', '#FF851B', '#FF4136', '#85144B',
          '#F012BE', '#B10DC9', '#111111', '#AAAAAA',
        ],
      }],
    ],
  };

  return (
    <>
      <h3>{t('UserPanel.8')}</h3>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="profilephoto-update">
          <b>{t('UserPanel.9')}</b>
          <input
            id="profilephoto-update"
            defaultValue={CURRENT_USER.userInfo.profilePhoto}
            type="text"
            name="profilePhoto"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="username-update">
          <b>{t('UserPanel.10')}</b>
          <input
            id="username-update"
            defaultValue={CURRENT_USER.userInfo.name}
            type="text"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="username-email">
          <b>{t('UserPanel.11')}</b>
          <input
            id="username-email"
            defaultValue={CURRENT_USER.userInfo.email}
            type="text"
            name="email"
            onChange={handleChange}
          />
        </label>
        <p className="update-password" onClick={() => { setUpdatePasswordPanelVisible(true); }}>Zmień hasło</p>
        {updatePasswordPanelVisible ? <UpdatePassword /> : false}
        <div htmlFor="description">
          {t('UserPanel.15')}
          <ReactQuill className="description-box" id="description" theme="snow" value={description} onChange={setDescription} modules={modules} formats={formats} />
        </div>
        <input
          key="profilephoto-input"
          id="send"
          type="submit"
          value={t('UserPanel.16')}
          className="submit"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
}

export default UserPanel;
