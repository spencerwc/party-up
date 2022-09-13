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
import MinimalLoader from '../components/general/MinimalLoader';

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        height: '100%',
        maxWidth: '100%',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            maxWidth: 500,
            height: 'auto',
            position: 'relative',
            left: 200,
            top: 200,
            borderRadius: theme.radius.lg,
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        },
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
            <Paper className={classes.form} px="lg" py="xl">
                <Title order={1} align="center" m="md" size={20}>
                    Log in to your account
                </Title>

                <form onSubmit={handleSubmit}>
                    <TextInput
                        radius="md"
                        label="Email address"
                        placeholder="account@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput
                        radius="md"
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <Text mt="md" size="sm" color="red">
                            {error}
                        </Text>
                    )}

                    <Button type="submit" fullWidth mt="xl" radius="md">
                        Log in
                    </Button>
                </form>

                <Text align="center" mt="xl">
                    Don't have an account?{' '}
                    <Anchor component={Link} to="/signup" weight={500}>
                        Sign up
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
};

export default Login;
