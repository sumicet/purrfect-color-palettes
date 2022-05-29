import { animate, useAnimation } from 'framer-motion';
import { memo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Square } from '../Square/Square';
import { Text } from '../Text/Text';
import * as Styled from './ColorSquare.styles';
import { useTheme, withTheme } from 'styled-components';
import { colord } from 'colord';
import Box from '../Box/Box';
import { useCopied } from '../../hooks/useCopied';
import { HoverCard } from '../HoverCard';

function ColorSquare({
    color,
    isLight,
    side = 'middle',
}: {
    color: string;
    isLight: boolean;
    side?: 'left' | 'right' | 'middle';
}) {
    const theme = useTheme();

    const textColor =
        (isLight && theme.type === 'dark') || (!isLight && theme.type === 'light')
            ? 'dark'
            : 'light';
    const colorObject = colord(color);
    const rgba = colorObject.toRgbString();
    const hsl = colorObject.toHslString();

    const hexCopy = useCopied(color);
    const rgbaCopy = useCopied(rgba);
    const hslCopy = useCopied(hsl);

    const borderRadius =
        side === 'middle'
            ? 0
            : side === 'left'
            ? `${theme.borderRadius} 0 0 ${theme.borderRadius}`
            : `0 ${theme.borderRadius} ${theme.borderRadius} 0`;

    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <Styled.StyledSquare dimension={`${theme.size.colorSquare}px`}>
                    <CopyToClipboard text={color}>
                        <Styled.ColorSquare>
                            <div
                                style={{
                                    background: color,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius,
                                }}
                                onClick={hexCopy.copy}
                            />
                        </Styled.ColorSquare>
                    </CopyToClipboard>
                    <Styled.ColorSquare
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            boxShadow: `0 0 0 0 ${color}`,
                        }}
                    >
                        <div
                            style={{
                                background: 'transparent',
                                width: '100%',
                                height: `${theme.size.colorSquare}px`,
                                borderRadius,
                            }}
                        />
                    </Styled.ColorSquare>

                    <Styled.CenterColorText flex={1} style={{ zIndex: 2 }}>
                        <Text variant='code' color={textColor}>
                            {hexCopy.text}
                        </Text>
                    </Styled.CenterColorText>
                </Styled.StyledSquare>
            </HoverCard.Trigger>
            <Styled.HoverContent>
                <HoverCard.Arrow />
                {[
                    { text: rgba, copy: rgbaCopy },
                    { text: hsl, copy: hslCopy },
                ].map(({ text, copy }) => (
                    <Box marginBottom='10px'>
                        <Styled.RgbaTextFlex
                            padding='10px'
                            background={theme.color.inputLighter}
                            borderRadius={theme.borderRadius}
                            style={{ cursor: 'pointer' }}
                            onClick={copy.copy}
                            minWidth={210}
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Text variant='code'>{copy.text}</Text>
                        </Styled.RgbaTextFlex>
                    </Box>
                ))}
                <Box marginBottom='10px'>
                    <Text variant='code' color='light'>
                        Brightness: {colorObject.brightness()}
                    </Text>
                </Box>
                <Text variant='code' color='light'>
                    This is a <b>{colorObject.isDark() ? 'dark' : 'light'}</b> color.
                </Text>
            </Styled.HoverContent>
        </HoverCard.Root>
    );
}

export default memo(ColorSquare);
