import styled from 'styled-components';
import { Text } from '../Text/Text';

const StyledButton = styled.button`
    padding: 10px;
    background-color: ${props => props.theme.color.button};
    border-radius: ${props => props.theme.borderRadius};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.color.buttonHover};
    }
`;

export function Button({ onClick, children }: { onClick: () => void; children: string }) {
    return (
        <StyledButton onClick={onClick}>
            <Text variant='code' color='light'>
                {children}
            </Text>
        </StyledButton>
    );
}
