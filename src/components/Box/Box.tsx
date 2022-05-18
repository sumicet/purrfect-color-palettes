import styled from 'styled-components';
import {
    color,
    layout,
    space,
    background,
    border,
    position,
    shadow,
    ColorProps,
    LayoutProps,
    SpaceProps,
    BackgroundProps,
    BorderProps,
    PositionProps,
    ShadowProps,
} from 'styled-system';

export interface BoxProps
    extends ColorProps,
        LayoutProps,
        SpaceProps,
        BackgroundProps,
        BorderProps,
        PositionProps,
        ShadowProps {
    as?: React.ElementType;
}

const Box = styled.div<BoxProps>`
    ${color}
    ${layout}
    ${space}
    ${background}
    ${border}
    ${position}
    ${shadow}
`;

export default Box;
