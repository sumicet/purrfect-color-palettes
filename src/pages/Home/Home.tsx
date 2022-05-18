import { useCallback, useEffect, useState } from 'react';
import Box from '../../components/Box/Box';
import ColorSquare from '../../components/ColorSquare/ColorSquare';
import Grid from '../../components/Grid/Grid';
// @ts-ignore
import { colord, extend } from 'colord';
import { HuePicker } from 'react-color';
import { Text } from '../../components/Text/Text';
import { useDebouncedValue } from 'rooks';
import mixPlugin from 'colord/plugins/mix';
import harmoniesPlugin from 'colord/plugins/harmonies';
import Flex from '../../components/Flex/Flex';
import Center from '../../components/Center/Center';

extend([mixPlugin]);
extend([harmoniesPlugin]);

interface Color {
    hex: string;
    isLight: boolean;
    belongsTo: string;
}

const actions = [
    'alpha',
    'darken',
    'desaturate',
    'lighten',
    'mix',
    'rotate',
    'saturate',
    'shades',
    'tints',
    'tones',
] as const;

type Action = typeof actions[number];

function Home() {
    const [color, setColor] = useState<string>('#4f00fff2');
    const [alpha, setAlpha] = useState<number>(0);

    const [debouncedColor] = useDebouncedValue(color, 100);

    const incrementor = 0.05;
    const generatedColorCount = 10;

    const getColors = useCallback(
        (action: Action) => {
            const arr: Color[] = [];
            if (!debouncedColor) {
                return [];
            }

            let result = debouncedColor;

            if (action === 'alpha') {
                let currentAlphaValue = 1 - incrementor;
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = colord(result)[action](currentAlphaValue).toHex();
                    if (arr[arr.length - 1] && newColor === arr[arr.length - 1].hex) {
                        return [];
                    }
                    arr.push({
                        hex: newColor,
                        isLight: colord(newColor).isLight(),
                        belongsTo: debouncedColor,
                    });
                    result = newColor;
                    currentAlphaValue -= incrementor;
                });
            } else if (action === 'mix') {
                let currentMixValue = incrementor;
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = colord(result)[action]('#ed3466', currentMixValue).toHex();
                    if (arr[arr.length - 1] && newColor === arr[arr.length - 1].hex) {
                        return [];
                    }
                    arr.push({
                        hex: newColor,
                        isLight: colord(newColor).isLight(),
                        belongsTo: debouncedColor,
                    });
                    result = newColor;
                    currentMixValue += incrementor;
                });
            } else if (action === 'rotate') {
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = colord(result)
                        [action](incrementor * 100)
                        .toHex();
                    if (arr[arr.length - 1] && newColor === arr[arr.length - 1].hex) {
                        return [];
                    }
                    arr.push({
                        hex: newColor,
                        isLight: colord(newColor).isLight(),
                        belongsTo: debouncedColor,
                    });
                    result = newColor;
                });
            } else if (action === 'tints' || action === 'shades' || action === 'tones') {
                return [
                    ...new Set(
                        colord(debouncedColor)
                            [action](generatedColorCount)
                            .map(c =>
                                JSON.stringify({
                                    hex: c.toHex(),
                                    isLight: c.isLight(),
                                    belongsTo: debouncedColor,
                                })
                            )
                    ),
                ].map(elem => JSON.parse(elem));
            } else {
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = colord(result)[action](incrementor).toHex();
                    if (arr[arr.length - 1] && newColor === arr[arr.length - 1].hex) {
                        return [];
                    }
                    arr.push({
                        hex: newColor,
                        isLight: colord(newColor).isLight(),
                        belongsTo: debouncedColor,
                    });
                    result = newColor;
                });
            }

            return arr;
        },
        [debouncedColor]
    );

    return (
        <Flex flexDirection='column' alignItems='center'>
            <Text variant='header' color='light'>
                Purrfect Color Palettes
            </Text>
            <Text variant='paragraph' color='light'>
                Consistent AF.
            </Text>

            <Grid gridTemplateColumns='max-content 1fr' width='100%'>
                <Center flex={1} flexDirection='column' marginRight={60}>
                    <HuePicker color={color} onChange={c => setColor(c.hex)} />
                </Center>

                <Grid gridGap={20} width='100%'>
                    {actions.map(action => (
                        <div key={action}>
                            <Box marginBottom={10}>
                                <Text variant='code' color='light'>
                                    {action.toUpperCase()}
                                </Text>
                            </Box>
                            <Grid gridTemplateColumns='repeat(auto-fit, 80px)' gridGap={10}>
                                {[...getColors(action)].map(({ hex, isLight, belongsTo }) => (
                                    <ColorSquare
                                        key={`${hex}-${belongsTo}`}
                                        color={hex}
                                        isLight={isLight}
                                    />
                                ))}
                            </Grid>
                        </div>
                    ))}
                </Grid>
            </Grid>
        </Flex>
    );
}

export default Home;
