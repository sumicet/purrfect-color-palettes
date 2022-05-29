import { CSSProperties } from 'react';
import styled from 'styled-components';
import { border, BorderProps, borderTop } from 'styled-system';
import { Text, TextProps } from '../Text/Text';
import { Input, InputProps } from './Input';

const StyledInput = styled(Input)<InputProps>`
    padding: 5px;
    width: 50px;
    text-align: center;
`;

export function SmallInput(props: InputProps) {
    return <StyledInput {...props} />;
}
