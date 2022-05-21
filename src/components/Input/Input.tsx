import { CSSProperties } from 'react';
import styled from 'styled-components';
import { border, BorderProps, borderTop } from 'styled-system';
import { Text, TextProps } from '../Text/Text';

interface StyledInputProps extends TextProps, BorderProps {}

const StyledInput = styled(Text)<StyledInputProps>`
    padding: 10px;
    border: 0px;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.color.input};
    width: 100%;

    &:active,
    &:focus {
        outline: 0px;
    }

    ${border};
`;

export interface InputProps extends BorderProps {
    value: string;
    onChange: (input: string) => void;
}

export function Input({ value, onChange, ...props }: InputProps) {
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
            {...props}
        />
    );
}
