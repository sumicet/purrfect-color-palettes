import styled from 'styled-components';
import { background, backgroundColor, BackgroundProps } from 'styled-system';
import Center from '../Center/Center';
import { motion } from 'framer-motion';
import * as Hover from '@radix-ui/react-hover-card';

export const ColorSquare = styled.div<BackgroundProps>`
    cursor: pointer;
    width: 100%;
    height: 100%;

    &:hover {
        transform: scale(1.1);
    }

    ${props => props.theme.animation.transition.default('all')};
`;

export const ColorSquareClickEffect = styled(motion.div)<BackgroundProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
`;

export const CenterColorText = styled(Center)`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    pointer-events: none;
`;

export const HoverContent = styled(Hover.Content)`
    background: ${props => props.theme.color.light};
    padding: ${props => props.theme.spacing.spacing16};
    border-radius: ${props => props.theme.borderRadius};
`;
