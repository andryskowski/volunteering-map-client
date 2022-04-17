/* eslint-disable prefer-const */
import { validationPlaceForm } from './ValidationPlaceForm';

describe('Place form validator', () => {
  let placeName = 'something';
  let webPage = 'something';
  let email = 'something@gmail.com';
  let phone = '525523321';
  let city = 'something';
  let street = 'something';
  let postalCode = '99-999';
  let houseNo = '12';
  let district = 'something';
  let logo = 'something';
  let category = 'something';
  let shortDescription = 'something';

  it('returns valid when form is properly filled', () => {
    let result = validationPlaceForm(placeName, webPage, email, phone, city, street, 
      postalCode, houseNo, district, logo, category, shortDescription);
    expect(result).toEqual(true);
  });

  it('returns no-valid when email format is wrong', () => {
    email = 'something';
    let result = validationPlaceForm(placeName, webPage, email, phone, city, street, 
      postalCode, houseNo, district, logo, category, shortDescription);
    expect(result).toEqual(false);
  });

  it('returns no-valid when phone format is wrong', () => {
    houseNo = 'something';
    let result = validationPlaceForm(placeName, webPage, email, phone, city, street, 
      postalCode, houseNo, district, logo, category, shortDescription);
    expect(result).toEqual(false);
  });

  it('returns no-valid when postalCode format is wrong', () => {
    postalCode = 'something';
    let result = validationPlaceForm(placeName, webPage, email, phone, city, street, 
      postalCode, houseNo, district, logo, category, shortDescription);
    expect(result).toEqual(false);
  });

  it('returns no-valid when houseNo format is wrong', () => {
    postalCode = 'something';
    let result = validationPlaceForm(placeName, webPage, email, phone, city, street, 
      postalCode, houseNo, district, logo, category, shortDescription);
    expect(result).toEqual(false);
  });
});
