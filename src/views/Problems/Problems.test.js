import React from 'react';
import { render, screen } from '@testing-library/react'; // Use screen for global queries
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Problems from './index'; // Your component
import { act } from 'react'; // Updated import

// Create a mock Redux store
const mockStore = configureStore([]);

describe('Problems Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      reducer: {
        currTab: 2, // Mock the state structure as required by your app
      },
    });
  });

  it('renders the Problems page correctly', async () => {
    // Use act only if necessary
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/problems']}>
            <Problems />
          </MemoryRouter>
        </Provider>
      );
    });

    // Use screen for queries
    expect(screen.getByText(/Study Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/all topic/i)).toBeInTheDocument();
  });

  it('renders all the problems correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Problems />
        </MemoryRouter>
      </Provider>
    );

    // Use screen for assertions
    expect(screen.getByText(/Two Sum/i)).toBeInTheDocument();
    expect(screen.getByText(/Reverse String/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Greater Element/i)).toBeInTheDocument();
    expect(screen.getByText(/Linked List Cycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Rotate Array/i)).toBeInTheDocument();

  });
});
