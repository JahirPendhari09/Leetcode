import React from 'react';
import { render, screen } from '@testing-library/react'; // Use screen for global queries
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from './Header';
import { act } from 'react';

// Create a mock Redux store
const mockStore = configureStore([]);

describe('Header Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            reducer: {
                currTab: 2,
                auth: false
            },
        });
    });

    it('renders the Header section is correctly', async () => {
        // Use act only if necessary
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/problems']}>
                        <Header />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(screen.getByText(/Explore/i)).toBeInTheDocument();
    });

    it('renders all the tabs show correctly', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        // Use screen for assertions
        expect(screen.getByText(/Problems/i)).toBeInTheDocument();
        expect(screen.getByText(/Contest/i)).toBeInTheDocument();
        expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
        expect(screen.getByText(/Interview/i)).toBeInTheDocument();
        expect(screen.getByText(/Store/i)).toBeInTheDocument();
    });

    it('renders all the tabs show correctly', () => {
        store = mockStore({
            reducer: {
                auth: false,
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        // Use screen for assertions
        expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
        expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
    });
    it('renders all the tabs show correctly', () => {
        store = mockStore({
            reducer: {
                auth: true,
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument()
    });

});
