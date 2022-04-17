import React from 'react';
import {
  render, waitFor, 
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import MessagesPanel from './MessagesPanel';
import CurrentUserContext from '../../contexts/CurrentUserContext';

test('renders messagespanel component', async () => {
  const CURRENT_USER_FROM_CONTEXT = {
    _id: '61dc29ea641032a2a2cf5fb6',
    name: 'stanislaw',
    email: 'fanklusek@gmail.com',
    role: 'admin',
    profilePhoto: 'https://i.postimg.cc/L8wtNMZG/ja.jpg',
    date: '2022-01-10T13:43:22.636Z',
  };

  const { getByText } = render(
    <CurrentUserContext.Provider value={CURRENT_USER_FROM_CONTEXT}>
      <Router>
        <MessagesPanel value={CURRENT_USER_FROM_CONTEXT} />
      </Router>
    </CurrentUserContext.Provider>,
  );
  const textNode = await waitFor(() => getByText('Konwersacja'));

  expect(textNode).toBeInTheDocument(); 
});
