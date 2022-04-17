import React, { useState, useContext } from 'react';
import '../../../scss/base/_comment-form.scss';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { postComment } from '../../../actions/FetchData';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { validationCommentForm } from './validationCommentForm';

function CommentForm({ placeId }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const { t } = useTranslation();

  function handleChange(event) {
    if (event.target.name === 'subject') setSubject(event.target.value);
    if (event.target.name === 'message') setMessage(event.target.value);
  }

  function handleSubmit() {
    const authorId = currentUser.userInfo._id;
    const isValidated = validationCommentForm(subject, message);
    if (isValidated === true) {
      const fetchMyData = async () => {
        const response = await postComment(authorId, subject, message, placeId);
      };
      fetchMyData();
    }
  }

  return (
    <>
      <div className="comment-form">
        <h1>{t('CommentsForm.1')}</h1>
        <label htmlFor="subject-comment">
          {t('CommentsForm.2')}
          <input className="subject-comment" id="subject-comment" type="text" name="subject" onChange={handleChange} />
        </label>
        <label htmlFor="textarea-comment">
          {t('CommentsForm.3')}
          <textarea className="textarea-comment" id="textarea-comment" type="text" name="message" onChange={handleChange} />
        </label>
        <input className="comment-submit" type="submit" value={t('CommentsForm.4')} onClick={handleSubmit} />
      </div>
    </>
  );
}

CommentForm.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default CommentForm;
