/* eslint-disable import/prefer-default-export */

const regexEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const regexPostalCode = new RegExp(/^([0-9]{2})(-[0-9]{3})?$/);
const regexPhone = new RegExp(/\(\d{3}\)|\d{3}/);
const regexNumber = new RegExp(/^[0-9]*$/);

export const validationPlaceForm = (placeName, webPage, email, phone, city, street, postalCode, houseNo,
  district, logo, category, shortDescription) => {
  if (placeName === '') { alert('Pole z nazwa miejca nie moze byc puste'); }
  else if (webPage === '') { alert('Pole strony internetowej nie moze byc puste'); }
  else if (email === '') { alert('Pole email nie moze byc puste'); }
  else if (phone === '') { alert('Pole telefon nie moze byc puste'); }
  else if (city === '') { alert('Pole miasto nie moze byc puste'); }
  else if (street === '') { alert('Pole ulica nie moze byc puste'); }
  else if (postalCode === '') { alert('Pole kod pocztowy nie moze byc puste'); }
  else if (houseNo === '') { alert('Pole numer domu nie moze byc puste'); }
  else if (district === '') { alert('Pole dzielnica nie moze byc puste'); }
  else if (logo === '') { alert('Pole zdjecia logo nie moze byc puste'); }
  else if (category === '') { alert('Pole kategorii nie moze byc puste'); }
  else if (shortDescription === '') { alert('Pole krotkiego opisu nie moze byc puste'); }
  else if (regexEmail.test(email) === false) { alert('Bledny adres email'); } 
  else if (regexPostalCode.test(postalCode) === false) { alert('Bledny kod pocztowy'); } 
  else if (regexPhone.test(phone) === false) { alert('Bledny kod pocztowy'); } 
  else if (regexNumber.test(houseNo) === false) { alert('Bledny numer domu'); } 
  else return true;
  return false;
};
