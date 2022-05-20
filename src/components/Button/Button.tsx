import styled from 'styled-components';
import { layout, LayoutProps } from 'styled-system';
import { Text } from '../Text/Text';

const StyledButton = styled.button<LayoutProps>`
    padding: 10px;
    background-color: ${props => props.theme.color.button};
    border-radius: ${props => props.theme.borderRadius};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.color.buttonHover};
    }

    ${layout}
`;

interface ButtonProps extends LayoutProps {
    onClick: () => void;
    children: string;
}

export function Button({ onClick, children, ...props }: ButtonProps) {
    return (
        <StyledButton onClick={onClick} {...props}>
            <Text variant='code' color='light'>
                {children}
            </Text>
        </StyledButton>
    );
}
