import { CSSProperties } from 'react';
import styled from 'styled-components';
import {
    background,
    border,
    BorderProps,
    BackgroundColorProps,
    backgroundColor,
} from 'styled-system';
import { Color } from '../../theme/default';
import { Text, TextProps } from '../Text/Text';

interface StyledInputProps extends TextProps, Omit<BorderProps, 'onChange'>, BackgroundColorProps {
    backgroundColor?: Color;
}

const StyledInput = styled(Text)<StyledInputProps>`
    padding: 10px;
    border: 0px;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props =>
        (props.backgroundColor && props.theme.color[props.backgroundColor]) ||
        props.theme.color.input};
    width: 100%;

    &:active,
    &:focus {
        outline: 0px;
    }

    ${border};
`;

export interface InputProps extends StyledInputProps {
    value: string;
    onChange: (input: string) => void;
    style?: CSSProperties;
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
