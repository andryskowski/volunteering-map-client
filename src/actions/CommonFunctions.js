/* eslint-disable import/prefer-default-export */
export const setRoleStyle = (role) => {
  if (role === 'moderator') return { color: 'blue' };
  if (role === 'admin') return { color: 'red' };
  if (role === 'user') return { color: 'green' };
  return { color: 'black' };
};
