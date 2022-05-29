import { ReactNode } from 'react';
import styled from 'styled-components';
import { border, BorderProps } from 'styled-system';
import Box, { BoxProps } from '../Box/Box';

interface StyledSquareProps {
    dimension: string | number;
}

const StyledSquare = styled(Box)<StyledSquareProps>`
    width: ${props =>
        typeof props.dimension === 'number' ? `${props.dimension}px` : props.dimension};
    position: relative;

    &:before {
        content: '';
        display: block;
        padding-top: 100%;
    }
    .content {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
    }

    ${border}
`;

export interface SquareProps extends StyledSquareProps, BoxProps, BorderProps {
    children?: ReactNode;
}

export const Square = ({ children, ...props }: SquareProps) => {
    return (
        <StyledSquare {...props}>
            <div className='content'>{children}</div>
        </StyledSquare>
    );
};
