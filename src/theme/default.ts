// Focus on screen of width >= 320px
// https://worship.agency/mobile-screen-sizes-for-2021
const breakpoint = {
    xs: 370,
    sm: 500,
    md: 852,
    lg: 968,
    xl: 1080,
    xxl: 1200,
};

export const theme = {
    breakpoint,
    mediaQuery: {
        xs: `@media screen and (min-width: ${breakpoint.xs}px)`,
        sm: `@media screen and (min-width: ${breakpoint.sm}px)`,
        md: `@media screen and (min-width: ${breakpoint.md}px)`,
        lg: `@media screen and (min-width: ${breakpoint.lg}px)`,
        xl: `@media screen and (min-width: ${breakpoint.xl}px)`,
        xxl: `@media screen and (min-width: ${breakpoint.xxl}px)`,
    },
    color: {
        dark: 'black',
        light: 'white',
        input: '#2e2e33',
        button: '#4c5ae5',
        buttonHover: '#4252ef',
    },
    font: {
        presets: {
            paragraph: {
                size: '16px',
                family: 'Lexend',
                weight: 100,
            },
            paragraphSmall: {
                size: '12px',
                family: 'Lexend',
                weight: 400,
            },
            code: {
                size: '12px',
                family: 'AzeretMono',
                weight: 400,
            },
            header: {
                size: '32px',
                family: 'Lexend',
                weight: 400,
            },
        },
        family: {
            1: 'Roboto',
            2: 'Circular Std',
        },
        size: {
            1: '14px',
            2: '16px',
            3: '20px',
            4: '24px',
            5: '32px',
        },
        weight: {
            1: 400,
            2: 700,
            3: 900,
        },
        lineHeight: 1.2,
    },
    borderRadius: '8px',
    spacing: {
        spacing08: '8px',
        spacing16: '16px',
        spacing32: '32px',
        spacing64: '64px',
    },
    size: {
        colorSquare: 80,
    },
    animation: {
        transition: {
            default: (property: string) => `transition: ${property} 0.1s ease-in-out`,
        },
    },
};

export type Color = keyof typeof theme.color;
export type FontSize = keyof typeof theme.font.size;
export type FontWeight = keyof typeof theme.font.weight;
export type FontFamily = keyof typeof theme.font.family;
export type Spacing = keyof typeof theme.spacing;
export type FontPresets = keyof typeof theme.font.presets;
