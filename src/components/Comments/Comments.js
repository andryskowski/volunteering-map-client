import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getComments, getUser } from '../../actions/FetchData';
import '../../scss/base/_comments.scss';
import CommentForm from './CommentForm/CommentForm';

function Comments({ placeId }) {
  const [comments, setComments] = useState([]);
  const [commentsNumber, setNumberComments] = useState(0);
  const { t } = useTranslation();

  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

  const getAuthor = async (authorId) => {
    const authorFromDb = await getUser(authorId);
    return authorFromDb;
  };

  useEffect(() => {
    getComments().then(async (commentsFromDb) => {
      for (let index = 0; index < commentsFromDb.length; index++) {
        const comment = commentsFromDb[index];

        comment.author = await getAuthor(comment.authorId);
      }

      setComments(commentsFromDb);

      // get number of comments fot this place
      comments.filter((comment) => comment.placeId === placeId)
        .map((comment, index) => setNumberComments(index + 1));
    });
  }, [comments, placeId]);

  return (
    <>
      <h1>
        {t('Comments.1')}
        {' '}
        <span>
          (
          {commentsNumber}
          )
        </span>
        :
      </h1>
      <div className="comments">
        {comments.filter((comment) => comment.placeId === placeId).reverse().map((comment) => (
          <div key={comment._id} className="comment">
            <Link to={comment.authorId} userId={comment.authorId}>
              <div className="profilephoto-container">
                <img className="profilephoto-comment" src={comment.author.profilePhoto} width="100px" height="100px" alt="no profilePhoto" />
              </div>
            </Link>
            <b>
              <Link to={comment.authorId} userId={comment.authorId}>
                <p style={setRoleStyle(comment.author.role)}>{comment.author.name}</p>
              </Link>
            </b>
            <p>
              <b>{t('Comments.2')}</b>
              {' '}
              {comment.subject}
            </p>
            <p>
              <b>{t('Comments.3')}</b>
              {' '}
              {comment.message}
            </p>
            <p>
              <b>{t('Comments.4')}</b>
              {' '}
              {comment.date.substring(0, 10)}
              {', o '}
              {comment.date.substring(11, 16)}
            </p>
          </div>
        ))}
      </div>
      <CommentForm placeId={placeId} />
    </>
  );
}

Comments.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default Comments;
