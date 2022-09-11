import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import UserCardList from '../components/users/UserCardList';

class ResizeObserver {
    observe() {}
    unobserve() {}
}

const Wrapper = ({ children }) => {
    return (
        <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
    );
};

const seedUsers = [
    {
        _id: 0,
        username: 'saulgoodman',
    },
    {
        _id: 1,
        username: 'w_white',
    },
];

describe('User card list', () => {
    window.ResizeObserver = ResizeObserver;

    it('renders a heading', () => {
        render(<UserCardList title="Test List" seeAllLink="#" users={[]} />, {
            wrapper: Wrapper,
        });
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('displays the list title', () => {
        render(<UserCardList title="Test List" seeAllLink="/" users={[]} />, {
            wrapper: Wrapper,
        });
        expect(screen.getByText('Test List')).toBeInTheDocument();
    });

    it('renders a see all link', () => {
        render(<UserCardList title="Test List" seeAllLink="/" users={[]} />, {
            wrapper: Wrapper,
        });
        expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders a UserCard', () => {
        render(
            <UserCardList title="Test List" seeAllLink="#" users={seedUsers} />,
            {
                wrapper: Wrapper,
            }
        );
        expect(screen.getByText(seedUsers[0].username)).toBeInTheDocument();
    });

    it('renders multiple UserCards', () => {
        render(
            <UserCardList title="Test List" seeAllLink="#" users={seedUsers} />,
            {
                wrapper: Wrapper,
            }
        );
        expect(screen.getByText(seedUsers[0].username)).toBeInTheDocument();
        expect(screen.getByText(seedUsers[1].username)).toBeInTheDocument();
    });
});
