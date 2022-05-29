import { colord } from 'colord';
import { useEffect, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Header } from './components/Header/Header';
import { PageWrapper, Wrapper } from './components/Wrapper/Wrapper';
import Home from './pages/Home/Home';
import { lightTheme, theme } from './theme/default';

function App() {
    const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(theme);
    const [backgroundColor, setBackgroundColor] = useState<string>(theme.color.background);

    useEffect(() => {
        if (colord(backgroundColor).isLight()) {
            setCurrentTheme(lightTheme);
        } else {
            setCurrentTheme(theme);
        }
    }, [backgroundColor]);

    return (
        <ThemeProvider
            theme={{
                ...currentTheme,
                color: { ...currentTheme.color, background: backgroundColor },
            }}
        >
            <Wrapper>
                <Header />
                <PageWrapper>
                    <Home
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                    />
                </PageWrapper>
            </Wrapper>
        </ThemeProvider>
    );
}

export default App;
