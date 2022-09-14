import { useState } from 'react';
import { Global, MantineProvider, ColorSchemeProvider } from '@mantine/core';

const GlobalStyle = () => {
    return (
        <Global
            styles={(theme) => ({
                body: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[1],
                },

                '.mantine-Input-input': {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[7]
                            : theme.white,
                    marginTop: 5,
                },

                '.mantine-Modal-header': {
                    marginBottom: 0,
                },
            })}
        />
    );
};

export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState('light');
    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    primaryColor: 'indigo',
                    colorScheme,
                }}
            >
                <GlobalStyle />
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
};
