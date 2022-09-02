import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';
import MinimalLoader from '../components/MinimalLoader';

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        borderRight: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
        height: '100%',
        maxWidth: '100%',
        paddingTop: 80,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            maxWidth: 500,
            marginLeft: 100,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

const Login = () => {
    const { classes } = useStyles();
    const { login, isLoading, error } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    if (isLoading) {
        return <MinimalLoader />;
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title
                    order={2}
                    className={classes.title}
                    align="center"
                    mt="md"
                    mb={50}
                >
                    Log in to your account
                </Title>

                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Email address"
                        placeholder="hello@gmail.com"
                        size="md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        size="md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <Text mt="md" color="red">
                            {error}
                        </Text>
                    )}

                    <Button type="submit" fullWidth mt="xl" size="md">
                        Log in
                    </Button>
                </form>

                <Text align="center" mt="md">
                    Don't have an account?{' '}
                    <Anchor component={Link} to="/signup" weight={700}>
                        Sign up
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
};

export default Login;
