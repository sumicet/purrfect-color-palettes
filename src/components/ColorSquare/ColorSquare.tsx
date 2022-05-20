import { useAnimation } from 'framer-motion';
import { memo } from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Square } from '../Square/Square';
import { Text } from '../Text/Text';
import * as Styled from './ColorSquare.styles';
import { useTheme, withTheme } from 'styled-components';
import { colord } from 'colord';
import Box from '../Box/Box';
import { useCopied } from '../../hooks/useCopied';

function ColorSquare({ color, isLight }: { color: string; isLight: boolean }) {
    const animateColorSquare = useAnimation();
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

    const handleCopyClick = () => {
        animateColorSquare.set({ scale: 1, opacity: 1 });
        animateColorSquare.start({ scale: 1.5, opacity: 0 });

        hexCopy.copy();
    };

    return (
        <HoverCard.Root openDelay={50} closeDelay={50}>
            <HoverCard.Trigger>
                <Square dimension={`${theme.size.colorSquare}px`}>
                    <CopyToClipboard text={color}>
                        <Styled.ColorSquare>
                            <div
                                style={{
                                    background: color,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: theme.borderRadius,
                                }}
                                onClick={handleCopyClick}
                            />
                        </Styled.ColorSquare>
                    </CopyToClipboard>
                    <Styled.ColorSquareClickEffect
                        animate={animateColorSquare}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <div
                            style={{
                                background: color,
                                width: '100%',
                                height: '100%',
                                borderRadius: theme.borderRadius,
                            }}
                        />
                    </Styled.ColorSquareClickEffect>

                    <Styled.CenterColorText flex={1}>
                        <Text variant='code' color={textColor}>
                            {hexCopy.text}
                        </Text>
                    </Styled.CenterColorText>
                </Square>
            </HoverCard.Trigger>
            <Styled.HoverContent sideOffset={10}>
                <HoverCard.Arrow fill={theme.color.input} />
                {[
                    { text: rgba, copy: rgbaCopy },
                    { text: hsl, copy: hslCopy },
                ].map(({ text, copy }) => (
                    <Box marginBottom='10px'>
                        <CopyToClipboard text={text}>
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
                        </CopyToClipboard>
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
