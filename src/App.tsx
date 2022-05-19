import { ThemeProvider } from 'styled-components';
import { PageWrapper, Wrapper } from './components/Wrapper/Wrapper';
import Home from './pages/Home/Home';
import { theme } from './theme/default';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <PageWrapper>
                    <Home />
                </PageWrapper>
            </Wrapper>
        </ThemeProvider>
    );
}

export default App;
