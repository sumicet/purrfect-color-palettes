import { useCallback, useState } from 'react';
import Box from '../../components/Box/Box';
import ColorSquare from '../../components/ColorSquare/ColorSquare';
import Grid from '../../components/Grid/Grid';
// @ts-ignore
import { Colord, colord, extend } from 'colord';
import { Text } from '../../components/Text/Text';
import { useDebouncedValue } from 'rooks';
import mixPlugin from 'colord/plugins/mix';
import harmoniesPlugin from 'colord/plugins/harmonies';
import Flex from '../../components/Flex/Flex';
import Center from '../../components/Center/Center';
import ColorPicker from '../../components/ColorPicker/ColorPicker';

extend([mixPlugin]);
extend([harmoniesPlugin]);

interface Color {
    color: Colord;
    belongsTo: Colord;
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
    const [color, setColor] = useState<Colord>(colord('#4f00fff2'));

    const [debouncedColor] = useDebouncedValue(color, 100);

    const incrementor = 0.05;
    const generatedColorCount = 8;

    const getColors = useCallback(
        (action: Action) => {
            const arr: Color[] = [];
            if (!debouncedColor) {
                return [] as Color[];
            }

            let result: Colord = debouncedColor;

            if (action === 'alpha') {
                let currentAlphaValue = 1 - incrementor;
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = result[action](currentAlphaValue);
                    if (
                        arr[arr.length - 1] &&
                        newColor.toHex() === arr[arr.length - 1].color.toHex()
                    ) {
                        return [] as Color[];
                    }
                    arr.push({
                        color: newColor,
                        belongsTo: debouncedColor,
                    });
                    result = newColor;
                    currentAlphaValue -= incrementor;
                });
            } else if (action === 'mix') {
                let currentMixValue = incrementor;
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = result[action]('#ed3466', currentMixValue);
                    if (
                        arr[arr.length - 1] &&
                        newColor.toHex() === arr[arr.length - 1].color.toHex()
                    ) {
                        return [] as Color[];
                    }
                    arr.push({
                        color: newColor,
                        belongsTo: debouncedColor,
                    });
                    result = newColor;
                    currentMixValue += incrementor;
                });
            } else if (action === 'rotate') {
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = result[action](incrementor * 100);
                    if (
                        arr[arr.length - 1] &&
                        newColor.toHex() === arr[arr.length - 1].color.toHex()
                    ) {
                        return [] as Color[];
                    }
                    arr.push({
                        color: newColor,
                        belongsTo: debouncedColor,
                    });
                    result = newColor;
                });
            } else if (action === 'tints' || action === 'shades' || action === 'tones') {
                // console.log(debouncedColor[action](generatedColorCount));
                return [
                    ...new Set(
                        debouncedColor[action](generatedColorCount).map(color => color.toHex())
                    ),
                ].map(color => ({
                    color: colord(color),
                    belongsTo: debouncedColor,
                }));
            } else {
                [...Array(generatedColorCount)].forEach(() => {
                    // @ts-ignore
                    const newColor = result[action](incrementor);
                    if (
                        arr[arr.length - 1] &&
                        newColor.toHex() === arr[arr.length - 1].color.toHex()
                    ) {
                        return [] as Color[];
                    }

                    arr.push({
                        color: newColor,
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

            <Center flex={1} width='100%'>
                <Flex width='fit-content' flex={1}>
                    <Center flex={1} flexDirection='column' marginRight={60}>
                        <ColorPicker
                            color={color.toHex()}
                            onChange={(c: any) => {
                                setColor(colord(c.hex));
                            }}
                        />
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
                                    {[...getColors(action)].map(({ color, belongsTo }) => (
                                        <ColorSquare
                                            key={`${color.toHex()}-${belongsTo.toHex()}`}
                                            color={color}
                                        />
                                    ))}
                                </Grid>
                            </div>
                        ))}
                    </Grid>
                </Flex>
            </Center>
        </Flex>
    );
}

export default Home;
