import { colord, Colord } from 'colord';
import { useCallback, useEffect } from 'react';
import { useDebouncedValue } from 'rooks';
import { actions } from '../../pages/Home/Home';
import Box from '../Box/Box';
import ColorSquare from '../ColorSquare/ColorSquare';
import Flex from '../Flex/Flex';
import Grid from '../Grid/Grid';
import { Text } from '../Text/Text';

interface Color {
    color: Colord;
    belongsTo: Colord;
}

type Action = typeof actions[number];

export function ColorGrid({ color, mixColor }: { color: Colord; mixColor: string }) {
    const [debouncedColor] = useDebouncedValue(color, 50);

    useEffect(() => {
        console.log(debouncedColor);
    }, [debouncedColor]);

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
                    const newColor = result[action](mixColor, currentMixValue);
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
        [debouncedColor, mixColor]
    );

    return (
        <Grid gridGap={20} width='fit-content'>
            {actions.map(action => {
                const colors = getColors(action);
                return (
                    <div key={action}>
                        <Box marginBottom={10}>
                            <Text variant='code' color='light'>
                                {action.toUpperCase()}
                            </Text>
                        </Box>
                        <Flex width='fit-content'>
                            {[...colors].map(({ color, belongsTo }, index) => (
                                <Box
                                    key={`${color.toHex()}-${belongsTo.toHex()}`}
                                    marginRight={index !== colors.length - 1 ? 10 : 0}
                                >
                                    <ColorSquare color={color.toHex()} />
                                </Box>
                            ))}
                        </Flex>
                    </div>
                );
            })}
        </Grid>
    );
}
