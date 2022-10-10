import { useNavigate } from 'react-router-dom';
import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
} from '@mantine/core';
import image from '../../images/undraw_video_game_night.svg';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: `${theme.spacing.lg}px ${theme.spacing.lg}px`,
        paddingTop: theme.spacing.xl,

        [theme.fn.largerThan('md')]: {
            paddingTop: theme.spacing.xl * 4,
            paddingBottom: theme.spacing.xl * 4,
        },
    },

    content: {
        maxWidth: '100%',
        marginRight: 0,

        [theme.fn.largerThan('md')]: {
            maxWidth: 480,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
        fontSize: 28,
        fontWeight: 900,

        [theme.fn.largerThan('xs')]: {
            fontSize: 44,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.xl * 2,
        width: '100%',

        [theme.fn.largerThan('md')]: {
            flex: 1,
            marginTop: 0,
        },
    },

    image: {
        [theme.fn.largerThan('xs')]: {
            maxWidth: '520px',
        },

        [theme.fn.largerThan('md')]: {
            maxWidth: '100%',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({
            color: theme.primaryColor,
        }).background,
        color: '#fff',
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },

    underline: {
        borderBottom: `6px solid ${theme.colors.indigo[8]}`,
        paddingBottom: '6px',
    },
}));

const Hero = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <div>
            <Container p={0}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            A <span className={classes.highlight}>better</span>{' '}
                            way to game{' '}
                            <span className={classes.underline}>together</span>.
                        </Title>
                        <Text color="dimmed" mt="xl">
                            Discover, create, and join parties to play your
                            favorite games <br /> and make new friends along the
                            way.
                        </Text>
                        <Group mt={30}>
                            <Button
                                radius="lg"
                                size="md"
                                className={classes.control}
                                onClick={() => navigate('/signup')}
                            >
                                Get started
                            </Button>
                            <Button
                                variant="default"
                                radius="lg"
                                size="md"
                                className={classes.control}
                                onClick={() => navigate('/parties')}
                            >
                                View parties
                            </Button>
                        </Group>
                    </div>
                    <div className={classes.imageContainer}>
                        <Image src={image} className={classes.image} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Hero;
