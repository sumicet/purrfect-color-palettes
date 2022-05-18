import { ThemeProvider } from 'styled-components';
import { PageWrapper, Wrapper } from './components/Wrapper/Wrapper';
import Home from './pages/Home/Home';

function App() {
    return (
        <Wrapper>
            <PageWrapper>
                <Home />
            </PageWrapper>
        </Wrapper>
    );
}

export default App;
