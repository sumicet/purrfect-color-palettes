import styled from 'styled-components';

export const ColorPicker = styled.div<{ color: string }>`
    .hseonm > div,
    .saturation-white,
    .saturation-black {
        border-radius: ${props => props.theme.borderRadius} !important;
    }

    /* Line */
    .hue-horizontal {
        border-radius: ${props => props.theme.borderRadius};
    }

    /* Circle */
    .hue-horizontal > div > div,
    .saturation-white > div > div {
        background: transparent !important;
        width: 8px !important;
        height: 8px !important;
        margin-top: 0px !important;
        border-radius: 50% !important;
        position: relative;
        box-shadow: none !important;
    }

    .hue-horizontal > div > div:after,
    .saturation-white > div > div:after {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        bottom: 0;
        right: 0;
        border-radius: 50% !important;
        border: 2px solid ${props => props.theme.color.light};
        width: 24px;
        height: 24px;
        background: ${props => props.color};
    }
`;
