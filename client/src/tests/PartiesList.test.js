import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PartiesList from '../components/parties/PartiesList';

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
        members: [''],
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
        lookingFor: '6',
        members: ['', ''],
        name: 'Friday Fright Night',
    },
    {
        _id: '2',
        date: new Date(),
        game: {
            cover: '',
            name: 'Beat Saber',
            websites: ['#'],
            platform: '',
        },
        lookingFor: '1',
        members: [''],
        name: 'Beat Saber Contest',
    },
];

describe('Party List component', () => {
    it('renders a list', () => {
        render(<PartiesList parties={seedParties} />, { wrapper: Wrapper });
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders a party', () => {
        render(<PartiesList parties={seedParties} />, { wrapper: Wrapper });
        expect(screen.getByText(seedParties[0].name)).toBeInTheDocument();
    });

    it('renders multiple parties', () => {
        render(<PartiesList parties={seedParties} />, { wrapper: Wrapper });

        const list = screen.getByRole('list');
        const { getAllByRole } = within(list);
        const items = getAllByRole('listitem');

        expect(items.length).toBe(3);
    });

    it('handles empty state', () => {
        render(<PartiesList parties={[]} />, { wrapper: Wrapper });
        expect(screen.getByText('No parties found.')).toBeInTheDocument();
    });
});
