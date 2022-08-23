import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import '@testing-library/jest-dom';
import CreatePartyForm from '../components/CreatePartyForm';

const Wrapper = ({ children }) => {
    return (
        <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
    );
};

describe('Create party form', () => {
    it('renders a form', () => {
        render(<CreatePartyForm />, { wrapper: Wrapper });
    });
});
