import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import '@testing-library/jest-dom';
import GameTable from '../components/GameTable';

const Wrapper = ({ children }) => {
    return (
        <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
    );
};

const seedGames = [
    {
        id: 0,
        name: 'Stardew Valley',
    },
    {
        id: 1,
        name: 'Palia',
    },
];

describe('Game list', () => {
    it('renders a table', () => {
        render(<GameTable games={seedGames} />, { wrapper: Wrapper });
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders a game row', () => {
        render(<GameTable games={seedGames} />, { wrapper: Wrapper });
        expect(screen.getByText(seedGames[0].name)).toBeInTheDocument();
    });

    it('renders multiple rows', () => {
        render(<GameTable games={seedGames} />, { wrapper: Wrapper });

        const table = screen.getByRole('table');
        const { getAllByRole } = within(table);
        const items = getAllByRole('row');

        expect(items.length).toBe(seedGames.length + 1);
    });
});
