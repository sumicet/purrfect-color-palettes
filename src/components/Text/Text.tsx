import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Color, FontFamily, FontPresets, FontSize, FontWeight } from '../../theme/default';

export interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'> {
    variant?: FontPresets;
    size?: FontSize;
    weight?: FontWeight;
    family?: FontFamily;
    lineHeight?: number;
    margin?: string;
    color?: Color;
}

export const Text = styled.p<TextProps>`
    font-size: ${props =>
        (props.size && props.theme.font.size[props.size]) ||
        props.theme.font.presets[props.variant || 'paragraph'].size};
    font-weight: ${props =>
        (props.weight && props.theme.font.weight[props.weight]) ||
        props.theme.font.presets[props.variant || 'paragraph'].weight};
    font-family: ${props =>
        (props.family && props.theme.font.family[props.family]) ||
        props.theme.font.presets[props.variant || 'paragraph'].family};
    line-height: ${props => props.lineHeight || props.theme.font.lineHeight};
    ${props => props.color && `color: ${props.theme.color[props.color]}`};
    ${props => props.margin && `margin: ${props.margin}`};
`;
