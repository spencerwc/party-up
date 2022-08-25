import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import PartyCard from '../components/PartyCard';

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
        date: new Date(Date.now()),
        game: {
            cover: '',
            name: 'Mario Party 3',
            websites: ['#'],
            platform: '',
        },
        members: [''],
        lookingFor: '3',
        name: "Mario's Party Weekend",
    },
    {
        _id: '1',
        date: new Date(Date.now()),
        game: {
            cover: '',
            name: 'Dead By Daylight',
            websites: ['#'],
            platform: '',
        },
        lookingFor: '3',
        members: ['', '', '', ''],
        name: 'Friday Fright Night',
    },
];

describe('Party card', () => {
    describe('Card structure', () => {
        it('renders a listitem', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(screen.getByRole('listitem')).toBeInTheDocument();
        });

        it('links to the party page', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(screen.getByRole('link')).toBeInTheDocument();
        });
    });

    describe('Party main details', () => {
        it('contains the party name', () => {
            render(<PartyCard party={seedParties[1]} />, { wrapper: Wrapper });
            expect(screen.getByText(seedParties[1].name)).toBeInTheDocument();
        });

        it('displays the party date', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(
                    dayjs(seedParties[0].date).format('dddd, MMMM D')
                )
            ).toBeInTheDocument();
        });

        it('displays the game details', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(seedParties[0].game.name)
            ).toBeInTheDocument();
        });
    });

    describe('Party membership details', () => {
        it('details the party member count', () => {
            render(<PartyCard party={seedParties[1]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(`${seedParties[1].members.length} members`)
            ).toBeInTheDocument();
        });

        it('adjusts member count for single party member', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(`${seedParties[0].members.length} member`)
            ).toBeInTheDocument();
        });

        it('details the looking for amount', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(
                    `Looking for ${
                        seedParties[0].lookingFor -
                        (seedParties[0].members.length - 1)
                    } more`
                )
            ).toBeInTheDocument();
        });

        it('accounts for filled parties', () => {
            render(<PartyCard party={seedParties[1]} />, { wrapper: Wrapper });
            expect(screen.getByText('Filled')).toBeInTheDocument();
        });
    });
});
