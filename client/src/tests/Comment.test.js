import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '@testing-library/jest-dom';
import Comment from '../components/general/Comment';

dayjs.extend(relativeTime);

const Wrapper = ({ children }) => {
    return (
        <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
    );
};

const seedComments = [
    {
        id: 0,
        user: {
            avatar_url: '#',
            username: 'isabelle',
        },
        comment:
            'What?! Sorry, but my ears just too fluffy and muffly, I guess. Please tell me once more.',
        createdAt: new Date(Date.now()),
        likes: 10,
    },
    {
        id: 1,
        user: {
            avatar_url: '#',
            username: 'Tnook',
        },
        comment:
            "We Don't Do Things Because They Are Easy Hm? We Do Them Because They Are Profitable.",
        createdAt: new Date(Date.now()),
        likes: 20,
    },
];

describe('Comment', () => {
    it('renders the user who commented', () => {
        render(
            <Comment
                author={seedComments[0].user}
                comment={seedComments[0].comment}
                createdAt={seedComments[0].createdAt}
            />,
            { wrapper: Wrapper }
        );
        expect(
            screen.getByText(seedComments[0].user.username)
        ).toBeInTheDocument();
    });

    it('renders the user avatar image', () => {
        render(
            <Comment
                author={seedComments[0].user}
                comment={seedComments[0].comment}
                createdAt={seedComments[0].createdAt}
            />,
            { wrapper: Wrapper }
        );
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('displays the comment date in time-from-now format', () => {
        render(
            <Comment
                author={seedComments[1].user}
                comment={seedComments[1].comment}
                createdAt={seedComments[1].createdAt}
            />,
            { wrapper: Wrapper }
        );
        expect(
            screen.getByText(dayjs(seedComments[1].createdAt).fromNow())
        ).toBeInTheDocument();
    });

    it('displays the comment', () => {
        render(
            <Comment
                author={seedComments[1].user}
                comment={seedComments[1].comment}
                createdAt={seedComments[1].createdAt}
            />,
            { wrapper: Wrapper }
        );

        expect(screen.getByText(seedComments[1].comment)).toBeInTheDocument();
    });

    it('displays the comment likes', () => {
        render(
            <Comment
                author={seedComments[1].user}
                comment={seedComments[1].comment}
                createdAt={seedComments[1].createdAt}
                likes={seedComments[1].likes}
            />,
            { wrapper: Wrapper }
        );

        expect(screen.getByText(seedComments[1].likes)).toBeInTheDocument();
    });

    it('links to the author', () => {
        render(
            <Comment
                author={seedComments[1].user}
                comment={seedComments[1].comment}
                createdAt={seedComments[1].createdAt}
                likes={seedComments[1].likes}
            />,
            { wrapper: Wrapper }
        );

        const links = screen.getAllByRole('link');

        expect(links[0].href).toContain(
            `/users/${seedComments[1].user.username}`
        );
        expect(links[1].href).toContain(
            `/users/${seedComments[1].user.username}`
        );
    });
});
