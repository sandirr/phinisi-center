/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Component from './Component';

jest.mock('../../../Configs/firebase', () => ({
  callFunc: jest.fn().mockResolvedValue({
    data: {
      content: '<p>Tentang kami</p>',
    },
  }),
}));

// describe('Component', () => {
//   it('renders the component with correct text', async () => {
//     const { getByText } = render(<Component />);

//     await waitFor(() => {
//       expect(getByText('Tentang Kami')).toBeInTheDocument();
//       expect(getByText('Tentang kami')).toBeInTheDocument();
//     });
//   });

//   it('renders the loading component', () => {
//     const { getByTestId } = render(<Component />);

//     expect(getByTestId('loading-component')).toBeInTheDocument();
//   });
// });
