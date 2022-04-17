import React from 'react';
import {
  render, waitFor, 
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import ListPlaces from './ListPlaces';
import { PlacesContext } from '../../contexts/PlacesContext';

test('renders component', async () => {
  const PLACES = [
    {
      _id: '61543ef88891ce5eac3d4b56',
      name: 'Fundacja dom w Łodzi',
      img: 'https://www.domwlodzi.org/wp-content/uploads/2018/04/DOM_W_LODZI_LOGO_KRZYWE-01.png',
      description: 'sth',
      category: 'dzieci',
      position: { lat: '52', lng: '52' },
      phone: '525525525',
      email: 'email@gmail.com',
      webPage: 'www.google.com',
      city: 'Lodz',
      street: 'Wierzbowa',
      postalCode: '90-999',
      houseNo: '12',
      district: 'Polesie',
      smallMapOfPlace: 'www.google.pl',
      statusPlace: 'added',
      addedBy: 'fnsuurn342in43n2',
      date: '2021-09-29T10:24:56.478Z',
      shortDescription: 'blablablablablabla',
    },
    {
      _id: '615440eb8891ce5eac3d4b5a',
      name: 'Fundacja dom w Zgierzu',
      img: 'https://www.domwlodzi.org/wp-content/uploads/2018/04/DOM_W_LODZI_LOGO_KRZYWE-01.png',
      description: 'sth',
      category: 'dzieci',
      position: { lat: '52', lng: '52' },
      phone: '525525525',
      email: 'email@gmail.com',
      webPage: 'www.google.com',
      city: 'Lodz',
      street: 'Wierzbowa',
      postalCode: '90-999',
      houseNo: '12',
      district: 'Polesie',
      smallMapOfPlace: 'www.google.pl',
      statusPlace: 'added',
      addedBy: 'fnsuurn342in43n2',
      date: '2021-09-29T10:24:56.478Z',
      shortDescription: 'blablablablablabla',
    },
  ];

  const { getByText } = render(
    <PlacesContext.Provider value={PLACES}>
      <Router>
        <ListPlaces />
      </Router>
    </PlacesContext.Provider>,
  );
  const textNode = await waitFor(() => getByText('Fundacja dom w Łodzi'));

  expect(textNode).toBeInTheDocument(); 
});
