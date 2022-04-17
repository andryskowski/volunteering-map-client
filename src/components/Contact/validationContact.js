/* eslint-disable import/prefer-default-export */

export const validation = (subject, message) => {
  if (subject === '') { alert('Pole tematu nie moze byc puste.'); }
  else if (message === '') { alert('Pole wiadomosci nie moze byc puste.'); }
  else if (message.length > 30) { alert('Wiadomość za długa, max 30 znaków.'); }
  else if (subject.length > 30) { alert('Wiadomość za długa, max 30 znaków.'); }
  else { return true; }
  return false;
};
