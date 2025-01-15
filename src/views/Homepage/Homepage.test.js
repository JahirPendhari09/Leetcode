import React from 'react';
import { render, screen } from '@testing-library/react'; // Use screen for queries
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Homepage from './index'; // Your component
import { act } from 'react'; // Import act from react, not react-dom/test-utils

// Create a mock Redux store
const mockStore = configureStore([]);

describe('Problems Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      reducer: {
        currTab: 1, // Mock state structure
      },
    });
  });

  it('Check weather Home page correctly rendered or not', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Homepage />
          </MemoryRouter>
        </Provider>
      );
    });

    // Use screen for assertions
    expect(screen.getByText(/Home page/i)).toBeInTheDocument();
  });
});
