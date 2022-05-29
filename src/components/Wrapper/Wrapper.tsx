import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: ${props => props.theme.color.background};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PageWrapper = styled.div`
    background-color: ${props => props.theme.color.background};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    max-width: 1432px;
    padding: 0 16px;
`;
