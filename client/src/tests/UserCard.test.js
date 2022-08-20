import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import UserCard from '../components/UserCard';

const Wrapper = ({ children }) => {
    return (
        <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
    );
};

const seedUser = {
    avatar: 'filler',
    username: 'saulgoodman',
};

describe('User card', () => {
    it('renders the user avatar', () => {
        render(<UserCard user={seedUser} />, {
            wrapper: Wrapper,
        });
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders the username', () => {
        render(<UserCard user={seedUser} />, {
            wrapper: Wrapper,
        });
        expect(screen.getByText(seedUser.username)).toBeInTheDocument();
    });

    it('links to the user page', () => {
        render(<UserCard user={seedUser} />, {
            wrapper: Wrapper,
        });
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});
