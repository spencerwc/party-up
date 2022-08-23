import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CreatePartyForm from '../components/CreatePartyForm';

const Wrapper = ({ children }) => {
    return (
        <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
    );
};

const seedInputs = {
    name: 'Stardew Valley 4 Corners Playthrough',
    lookingFor: 300,
    details:
        'Looking to start a new save with dedicated players. Going for 100% completion run.',
};

describe('Create party form', () => {
    it('renders a form', () => {
        render(<CreatePartyForm />, { wrapper: Wrapper });
        expect(
            screen.getByRole('form', {
                name: /start a party/i,
            })
        ).toBeInTheDocument();
    });

    it('renders name, date, lookingFor, and details inputs', () => {
        render(<CreatePartyForm />, { wrapper: Wrapper });

        expect(
            screen.getByPlaceholderText('My Cool Party')
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('Date of the event')
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText('# of Members')).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('Details about your party')
        ).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        render(<CreatePartyForm />, { wrapper: Wrapper });
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('updates values on user input', () => {
        render(<CreatePartyForm />, { wrapper: Wrapper });

        const nameInput = screen.getByPlaceholderText('My Cool Party');
        const detailsInput = screen.getByPlaceholderText(
            'Details about your party'
        );

        userEvent.type(nameInput, seedInputs.name);
        userEvent.type(detailsInput, seedInputs.details);

        expect(nameInput).toHaveValue(seedInputs.name);
        expect(detailsInput).toHaveValue(seedInputs.details);
    });

    it('limits looking for value to 100', () => {
        render(<CreatePartyForm />, { wrapper: Wrapper });

        const lookingForInput = screen.getByPlaceholderText('# of Members');

        userEvent.type(lookingForInput, '300');
        userEvent.tab();

        expect(lookingForInput).toHaveValue('100');
    });
});
