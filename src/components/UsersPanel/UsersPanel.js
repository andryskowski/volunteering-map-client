import React, {
  useEffect, useState,  
} from 'react';
import { Link } from 'react-router-dom';
import { getUsers, removeUser, updateUserRole } from '../../actions/FetchData';
import '../../scss/base/_users-list.scss';
import { setRoleStyle } from '../../actions/CommonFunctions';
import Pagination from '../Pagination/Pagination';

function UsersPanel() {
  const [users, setUsers] = useState([]);
  // pagination
  const [itemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const usersWithPagination = users.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getUsers();
      setUsers(response);
    };
    fetchMyData();
  }, []);

  const removeSelectedUser = (event) => {
    const removedUserId = event.target.value;
    const fetchMyData = async () => {
      await removeUser(removedUserId);
    };
    fetchMyData();
    alert(`Usunieto uzytkownika o id ${removedUserId}`);
    window.location.reload(true);
  };

  const handleChangeRole = (event) => {
    const changedRole = event.target.value;
    const changedUserId = event.target.id;
    updateUserRole(changedUserId, changedRole);
  };

  return (
    <>
      <div className="page-container users-panel">
        <h1>Panel użytkowników</h1>
        <div className="users-container">
          {usersWithPagination.map((user) => (
            <div className="user-container">
              <button className="remove-user-button" value={user._id} type="submit" onClick={removeSelectedUser}>X</button>
              <div className="role-container">
                <p>Zmień rolę na: </p>
                <select onChange={handleChangeRole} id={user._id}>
                  <option selected value=""> </option>
                  <option value="admin">admin</option>
                  <option value="moderator">moderator</option>
                  <option value="user">user</option>
                </select>
              </div>
              <Link to={user._id} userId={user._id}>
                <img src={user.profilePhoto} className="profile-photo" alt="no user img" width="100px" height="100px" />
              </Link>
              <p>
                <b>rola:</b> 
                {' '}
                <span style={setRoleStyle(user.role)}>{user.role}</span>
              </p>
              <p>
                <b>login:</b> 
                {' '}
                <Link to={user._id} userId={user._id}>
                  {user.name}
                </Link>
              </p>
              <p>
                <b>id:</b> 
                {' '}
                {user._id}
              </p>
              <p>
                <b>email:</b> 
                {' '}
                {user.email}
              </p>
              <p>
                <b>data dołączenia:</b> 
                {' '}
                {' '}
                {user.date.substring(0, 10)}
                {' '}
                {user.date.substring(11, 19)}
              </p>
            </div>
          ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={users.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default UsersPanel;
