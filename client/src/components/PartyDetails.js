import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    Avatar,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.largerThan('xs')]: {
            justifyContent: 'space-between',
        },
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        objectFit: 'cover',
        backgroundColor: theme.colors.gray[2],
        maxWidth: '250px',
        borderRadius: theme.radius.md,

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
}));

const PartyDetails = ({ party }) => {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.banner}>
                <Container m="md" p={0}>
                    <div className={classes.inner}>
                        <div className={classes.content}>
                            <Title className={classes.title}>
                                {party.name}
                            </Title>
                            <Text color="dimmed" mt="md" size="xl">
                                {party.date.toLocaleString()}
                            </Text>

                            {party.lookingFor > 0 && (
                                <Text color="dimmed" mt="md" size="lg">
                                    Looking for {party.lookingFor} more
                                </Text>
                            )}

                            <Group mt={30}>
                                <Text>Led by</Text>
                                <Avatar
                                    src={null}
                                    alt="avatar"
                                    size="lg"
                                    radius="xl"
                                />
                            </Group>
                            <Group mt={30}>
                                {party.lookingFor > 0 ? (
                                    <Button
                                        size="md"
                                        className={classes.control}
                                    >
                                        Join Party
                                    </Button>
                                ) : (
                                    <Text color="dimmed">
                                        The party has filled.
                                    </Text>
                                )}
                            </Group>
                        </div>
                        <Image src="" className={classes.image} mr="xl" />
                    </div>
                </Container>
            </div>
            <Text m="md">{party.details}</Text>
        </>
    );
};

export default PartyDetails;
