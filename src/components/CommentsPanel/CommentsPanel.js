import React, {
  useEffect, useState,
} from 'react';
import { getComments, removeComment } from '../../actions/FetchData';
import Pagination from '../Pagination/Pagination';
import '../../scss/base/_comments-panel.scss';
  
function CommentsPanel() {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState('Error: cannot connect to Comments.');
  // pagination
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const commentsWithPagination = comments?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getComments();
      setComments(response);
    };
    fetchMyData();
  }, []);

  useEffect(() => {
    if (comments && Array.isArray(comments)) {
      setError(null);
    }
  }, [comments]);
  
  const handleRemoveComment = (event) => {
    const removedCommentId = event.target.value;
    const fetchMyData = async () => {
      await removeComment(removedCommentId);
    };
    fetchMyData();
    alert(`Usunieto uzytkownika o id ${removedCommentId}`);
    window.location.reload(true);
  };

  return (
    <>
      <div className="page-container comments-panel">
        <h1>Panel komentarzy</h1>
        {error && <p>{error}</p>}
        {commentsWithPagination?.map((comment) => (
          <div className="comment-container">
            <h5>
              commentId:
              {' '}
              {comment._id}
            </h5>
            <h5>
              authorId:
              {' '}
              {comment.authorId}
            </h5>
            <h5>
              placeId:
              {' '}
              {comment.placeId}
            </h5>
            <h5>
              temat:
              {' '}
              <span className="message">
                {comment.subject}
              </span>
            </h5>
            <h5>
              wiadomość:
              {' '}
              <span className="message">
                {comment.message}
              </span>
            </h5>
            <h5>
              data:
              {' '}
              <span className="message">
                {comment.date.substring(0, 10)}
                {' '}
                {comment.date.substring(11, 19)}
              </span>
            </h5>
            <button className="remove-comment" type="submit" value={comment._id} onClick={handleRemoveComment}>Usuń komentarz</button>
          </div>
        ))}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={comments?.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
  
export default CommentsPanel;
