import React from 'react';

export const CURRENT_USER_FROM_CONTEXT = {
  userInfo: JSON.parse(window.localStorage.getItem('CURRENT_USER')),
};

const CurrentUserContext = React.createContext(CURRENT_USER_FROM_CONTEXT);

export default CurrentUserContext;
