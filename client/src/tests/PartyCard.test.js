import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PartyCard from '../components/PartyCard';

const Wrapper = ({ children }) => {
    return <MemoryRouter>{children}</MemoryRouter>;
};

const seedParties = [
    {
        _id: '0',
        date: new Date(),
        game: {
            cover: '',
            name: 'Mario Party 3',
            websites: ['#'],
            platform: '',
        },
        lookingFor: '3',
        memberCount: '1',
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
        lookingFor: '0',
        memberCount: '2',
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

        it('renders the party image', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(screen.getByRole('img')).toBeInTheDocument();
        });

        it('displays the party date', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(seedParties[0].date.toLocaleString())
            ).toBeInTheDocument();
        });
    });

    describe('Party membership details', () => {
        it('details the party member count', () => {
            render(<PartyCard party={seedParties[1]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(`${seedParties[1].memberCount} members`)
            ).toBeInTheDocument();
        });

        it('adjusts member count for single party member', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(`${seedParties[0].memberCount} member`)
            ).toBeInTheDocument();
        });

        it('details the looking for count', () => {
            render(<PartyCard party={seedParties[0]} />, { wrapper: Wrapper });
            expect(
                screen.getByText(
                    `Looking for ${seedParties[0].lookingFor} more`
                )
            ).toBeInTheDocument();
        });

        it('accounts for filled parties', () => {
            render(<PartyCard party={seedParties[1]} />, { wrapper: Wrapper });
            expect(screen.getByText('Filled')).toBeInTheDocument();
        });
    });
});
