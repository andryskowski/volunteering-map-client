/* eslint-disable import/prefer-default-export */

export const validationCommentForm = (subject, message) => {
  if (subject === '') { alert('Pole tematu nie moze byc puste.'); }
  else if (message === '') { alert('Pole wiadomosci nie moze byc puste.'); }
  else if (subject.length > 30) { alert('Temat komentarza nie moze byc dluzszy niz 30 znakow'); }
  else if (message.length > 500) { alert('Wiadomosc nie moze byc dluzsza niz 500 znakow'); }
  else { return true; }
  return false;
};
