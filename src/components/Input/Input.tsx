import styled from 'styled-components';
import { Text } from '../Text/Text';

const StyledInput = styled(Text)`
    padding: 10px;
    border: 0px;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.color.input};
    width: 100%;

    &:active,
    &:focus {
        outline: 0px;
    }
`;

export function Input({ value, onChange }: { value: string; onChange: (input: string) => void }) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <StyledInput
            as='input'
            variant='code'
            color='light'
            value={value}
            onChange={handleChange}
        />
    );
}
