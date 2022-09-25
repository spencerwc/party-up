import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import PartyDetails from '../components/party/PartyDetails';

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

const seedParties = [
    {
        _id: '0',
        date: new Date(),
        details: 'This will be fun!',
        leader: {
            username: 'test1',
        },
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
        leader: {
            username: 'test2',
        },
        game: {
            cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4m8x.png',
            name: 'Dead By Daylight',
            websites: ['#'],
            platform: '',
        },
        lookingFor: '3',
        members: ['', ''],
        name: 'Friday Fright Night',
    },
];

describe('Party details', () => {
    describe('Party main banner', () => {
        it('renders the party name as a heading', () => {
            render(
                <PartyDetails
                    party={seedParties[0]}
                    members={seedParties[0].members}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(screen.getByRole('heading')).toBeInTheDocument();
            expect(screen.getByText(seedParties[0].name)).toBeInTheDocument();
        });

        it('displays the party date', () => {
            render(
                <PartyDetails
                    party={seedParties[1]}
                    members={seedParties[1].members}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(
                screen.getByText(
                    dayjs(seedParties[1].date).format('dddd, MMMM D YYYY')
                )
            ).toBeInTheDocument();
        });

        it('displays the party game name', () => {
            render(
                <PartyDetails
                    party={seedParties[1]}
                    members={seedParties[1].members}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(
                screen.getByText(seedParties[1].game.name)
            ).toBeInTheDocument();
        });

        it('displays the leader username', () => {
            render(
                <PartyDetails
                    party={seedParties[0]}
                    members={seedParties[0].members}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(
                screen.getByText(seedParties[0].leader.username)
            ).toBeInTheDocument();
        });
    });

    describe('Party membership details', () => {
        it('renders the member count', () => {
            render(
                <PartyDetails
                    party={seedParties[0]}
                    members={seedParties[0].members}
                />,
                {
                    wrapper: Wrapper,
                }
            );
            expect(
                screen.getByText(seedParties[0].members.length)
            ).toBeInTheDocument();
        });

        it('renders the openings count', () => {
            const openings = 3;

            render(
                <PartyDetails
                    party={seedParties[1]}
                    members={seedParties[1].members}
                    openings={openings}
                />,
                {
                    wrapper: Wrapper,
                }
            );

            expect(screen.getByText(openings)).toBeInTheDocument();
        });
    });
});
