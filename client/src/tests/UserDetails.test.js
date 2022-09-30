import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import UserDetails from '../components/user/UserDetails';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

const Wrapper = ({ children }) => {
    return (
        <AuthContext.Provider value={{ user: { username: 'test' } }}>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
    );
};

const seedUsers = [
    {
        avatar: '#',
        bio: 'Hungry for a mystery',
        createdAt: new Date(Date.now()),
        friends: ['', ''],
        username: 'shaggy',
    },
    {
        avatar: '#',
        bio: 'What a ham',
        createdAt: new Date(Date.now()),
        friends: [''],
        username: 'scooby_doo',
    },
];

describe('User details', () => {
    describe('User banner', () => {
        it('renders the username as a heading', () => {
            render(
                <UserDetails
                    user={seedUsers[0]}
                    friends={seedUsers[0].friends}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(screen.getByRole('heading')).toBeInTheDocument();
            expect(screen.getByText(seedUsers[0].username)).toBeInTheDocument();
        });

        it('displays the user avatar', () => {
            render(
                <UserDetails
                    user={seedUsers[0]}
                    friends={seedUsers[0].friends}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(screen.getByRole('img')).toBeInTheDocument();
        });

        it('renders the user bio', () => {
            render(
                <UserDetails
                    user={seedUsers[0]}
                    friends={seedUsers[0].friends}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(screen.getByText(seedUsers[0].bio)).toBeInTheDocument();
        });

        it('displays the date that the user registered', () => {
            render(
                <UserDetails
                    user={seedUsers[1]}
                    friends={seedUsers[1].friends}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(
                screen.getByText(
                    `Joined ${dayjs(seedUsers[1].createdAt).format(
                        'MMMM YYYY'
                    )}`
                )
            ).toBeInTheDocument();
        });
    });

    describe('User friends', () => {
        it('renders the friend count', () => {
            render(
                <UserDetails
                    user={seedUsers[0]}
                    friends={seedUsers[0].friends}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(
                screen.getByText(`${seedUsers[0].friends.length} friends`)
            ).toBeInTheDocument();
        });

        it('handles friends list with one friend', () => {
            render(
                <UserDetails
                    user={seedUsers[1]}
                    friends={seedUsers[1].friends}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(
                screen.getByText(`${seedUsers[1].friends.length} friend`)
            ).toBeInTheDocument();
        });

        it('links to the friends list', () => {
            render(
                <UserDetails
                    user={seedUsers[1]}
                    friends={seedUsers[1].friends}
                />,
                {
                    wrapper: Wrapper,
                }
            );

            expect(screen.getByRole('link')).toBeInTheDocument();
        });
    });
});
