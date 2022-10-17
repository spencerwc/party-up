import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
    Center,
} from '@mantine/core';
import { IconConfetti } from '@tabler/icons';
import MinimalLoader from '../components/general/MinimalLoader';

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: '100vh',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            paddingTop: theme.spacing.xl * 2,
        },
    },

    form: {
        height: '100%',
        maxWidth: '100%',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            maxWidth: 500,
            height: 'auto',
            borderRadius: theme.radius.lg,
            margin: '0 auto',
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        },
    },

    logo: {
        marginBottom: theme.spacing.xs,

        svg: {
            transform: 'rotate(-45deg)',
            color: theme.colors.teal[6],
            fill: theme.colors.teal[6],
            width: 40,
            height: 40,
        },
    },
}));

const Signup = () => {
    const { classes } = useStyles();
    const { signUp, isLoading, error } = useSignup();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(email, username, password);
    };

    if (isLoading) {
        return <MinimalLoader />;
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} px="lg" py="xl">
                <Center>
                    <Anchor component={Link} to="/" className={classes.logo}>
                        <IconConfetti />
                    </Anchor>
                </Center>

                <Title order={1} align="center" m="md" size={20} weight={500}>
                    Get ready to party up!
                </Title>

                <form onSubmit={handleSubmit}>
                    <TextInput
                        radius="md"
                        label="Email address"
                        placeholder="hello@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        radius="md"
                        label="Username"
                        placeholder="Your username"
                        mt="md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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

                    <Button
                        type="submit"
                        fullWidth
                        mt="xl"
                        radius="md"
                        disabled={isLoading}
                    >
                        Sign up
                    </Button>
                </form>

                <Text align="center" mt="xl">
                    Already have an account?{' '}
                    <Anchor component={Link} to="/login" weight={500}>
                        Log in
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
};

export default Signup;
