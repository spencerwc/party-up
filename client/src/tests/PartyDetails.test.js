import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PartyDetails from '../components/PartyDetails';
import { AuthProvider } from '../context/AuthContext';

const Wrapper = ({ children }) => {
    return (
        <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
    );
};

const seedParties = [
    {
        _id: '0',
        date: new Date(),
        details: 'This will be fun!',
        game: {
            cover: '',
            name: 'Mario Party 3',
            websites: ['#'],
            platform: '',
        },
        lookingFor: '3',
        members: [],
        name: "Mario's Party Weekend",
    },
    {
        _id: '1',
        date: new Date(),
        game: {
            cover: '',
            name: 'Dead By Daylight',
            websites: ['#'],
            platform: '',
        },
        lookingFor: '1',
        members: [''],
        name: 'Friday Fright Night',
    },
];

describe('Party details', () => {
    describe('Party main banner', () => {
        it('renders the party name as a heading', () => {
            render(<PartyDetails party={seedParties[0]} />, {
                wrapper: Wrapper,
            });
            expect(screen.getByRole('heading')).toBeInTheDocument();
            expect(screen.getByText(seedParties[0].name)).toBeInTheDocument();
        });

        it('displays the party date', () => {
            render(<PartyDetails party={seedParties[1]} />, {
                wrapper: Wrapper,
            });
            expect(
                screen.getByText(seedParties[1].date.toLocaleString())
            ).toBeInTheDocument();
        });
    });

    describe('Party game details', () => {
        it('renders the cover image', () => {
            render(<PartyDetails party={seedParties[0]} />, {
                wrapper: Wrapper,
            });
            expect(screen.getByRole('img')).toBeInTheDocument();
        });
    });

    describe('Party join button', () => {
        it('renders a button', () => {
            render(<PartyDetails party={seedParties[0]} />, {
                wrapper: Wrapper,
            });
            expect(screen.getByRole('button')).toBeInTheDocument();
            expect(screen.getByText('Join Party')).toBeInTheDocument();
        });

        it('Displayes party filled notice when no more available spots', () => {
            render(<PartyDetails party={seedParties[1]} />, {
                wrapper: Wrapper,
            });
            expect(
                screen.getByText('The party has filled.')
            ).toBeInTheDocument();
        });
    });

    describe('Party description', () => {
        it('renders the party details', () => {
            render(<PartyDetails party={seedParties[0]} />, {
                wrapper: Wrapper,
            });
            expect(
                screen.getByText(seedParties[0].details)
            ).toBeInTheDocument();
        });
    });
});
