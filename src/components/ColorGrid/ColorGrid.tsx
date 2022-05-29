import { colord, Colord } from 'colord';
import { Reorder, useDragControls } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedValue } from 'rooks';
import { useTheme } from 'styled-components';
import { DragHandle } from '../../assets/icons/DragHandle/DragHandle';
import { actions } from '../../pages/Home/Home';
import Box from '../Box/Box';
import ColorSquare from '../ColorSquare/ColorSquare';
import Flex from '../Flex/Flex';
import Grid from '../Grid/Grid';
import { Text } from '../Text/Text';
import * as Styled from './ColorGrid.styles';
import { Settings } from './Settings/Settings';

interface Color {
    color: Colord;
    belongsTo: Colord;
}

export type Action = typeof actions[number];

export function ColorGrid({ color, mixColor }: { color: Colord; mixColor: string }) {
    const [debouncedColor] = useDebouncedValue(color, 50);
    const [colors, setColors] = useState<{ action: Action; colors: Color[] }[]>([]);
    const [settings, setSettings] = useState<{
        [Property in Action]: {
            step: string;
            count: number;
        };
    }>({
        alpha: {
            step: '0.1',
            count: 9,
        },
        darken: {
            step: '0.05',
            count: 9,
        },
        desaturate: {
            step: '0.07',
            count: 9,
        },
        lighten: {
            step: '0.06',
            count: 9,
        },
        mix: {
            step: '0.1',
            count: 9,
        },
        rotate: {
            step: '-7',
            count: 9,
        },
        saturate: {
            step: '0.04',
            count: 9,
        },
        shades: {
            step: '0',
            count: 9,
        },
        tints: {
            step: '0',
            count: 9,
        },
        tones: {
            step: '0',
            count: 9,
        },
    });

    const getColors = useCallback(
        (action: Action) => {
            const arr: Color[] = [];
            if (!debouncedColor) {
                return [] as Color[];
            }

            let result: Colord = debouncedColor;

            let current: number = 0;
            if (action === 'alpha') {
                current = 1 - parseFloat(settings.alpha.step);
            } else {
                current = parseFloat(settings[action].step);
            }

            let next = (value: number) => {
                if (action === 'alpha') {
                    return value - parseFloat(settings[action].step);
                } else if (action === 'mix') {
                    return value;
                } else {
                    return value;
                }
            };

            if (!(action === 'tints' || action === 'shades' || action === 'tones')) {
                [...Array(settings[action].count)].forEach(() => {
                    let newColor: Colord;
                    if (action === 'mix') {
                        newColor = result[action](mixColor, current);
                    } else {
                        // @ts-ignore
                        newColor = result[action](current);
                    }

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
                    current = next(current);
                });
            } else if (action === 'tints' || action === 'shades' || action === 'tones') {
                // console.log(debouncedColor[action](generatedColorCount));
                return [
                    ...new Set(
                        debouncedColor[action](settings[action].count).map(color => color.toHex())
                    ),
                ].map(color => ({
                    color: colord(color),
                    belongsTo: debouncedColor,
                }));
            }
            return arr;
        },
        [debouncedColor, mixColor, settings]
    );

    useEffect(() => {
        const finalColors: { action: Action; colors: Color[] }[] = [];
        actions.forEach(action => {
            const currentColors = getColors(action);
            // if (
            //     currentColors.length === 1 &&
            //     currentColors[0].color.toHex() === currentColors[0].belongsTo.toHex()
            // ) {
            //     return;
            // }
            finalColors.push({ action, colors: currentColors });
        });

        setColors(finalColors);
    }, [color, settings]);

    return (
        <Grid gridGap={20} width='fit-content'>
            <Reorder.Group axis='y' values={colors} onReorder={setColors}>
                {colors.map(item => (
                    <Row
                        key={`${item.action}`}
                        item={item}
                        sliderValue={settings[item.action].step}
                        onSliderValue={(v: string) => {
                            setSettings(prev => ({
                                ...prev,
                                [item.action]: {
                                    step: v,
                                    count: prev[item.action].count,
                                },
                            }));
                        }}
                    />
                ))}
            </Reorder.Group>
        </Grid>
    );
}

function Row({
    item,
    sliderValue,
    onSliderValue,
}: {
    item: {
        action: Action;
        colors: Color[];
    };
    sliderValue: string;
    onSliderValue: (v: string) => void;
}) {
    const theme = useTheme();
    const dragControls = useDragControls();

    return (
        <Styled.Row value={item} dragControls={dragControls} dragListener={false}>
            <Flex
                marginBottom={theme.spacing.spacing08}
                alignItems='center'
                style={{ cursor: 'pointer' }}
            >
                <Flex
                    marginRight={theme.spacing.spacing08}
                    onPointerDown={event => {
                        event.preventDefault();
                        dragControls.start(event);
                    }}
                >
                    <DragHandle />
                </Flex>
                <Box marginRight={theme.spacing.spacing08}>
                    <Text
                        variant='code'
                        color='light'
                        onPointerDown={event => {
                            event.preventDefault();
                            dragControls.start(event);
                        }}
                    >
                        {item.action.toUpperCase()}
                    </Text>
                </Box>

                <Flex flex={1} alignItems='center' justifyContent='flex-end'>
                    <Settings
                        value={sliderValue}
                        onValueChange={onSliderValue}
                        min={item.action === 'rotate' ? -360 : 0}
                        max={item.action === 'rotate' ? 360 : 1}
                        step={item.action === 'rotate' ? 1 : 0.01}
                        action={item.action}
                    />
                </Flex>
            </Flex>
            <Flex
                width='fit-content'
                style={{
                    boxShadow: theme.shadow.default,
                    borderRadius: theme.borderRadius,
                }}
            >
                {[...item.colors].map(({ color, belongsTo }, index) => (
                    <Box
                        key={`${color.toHex()}-${belongsTo.toHex()}-${item.action}-${sliderValue}`}
                    >
                        <ColorSquare
                            color={color.toHex()}
                            isLight={color.isLight()}
                            side={
                                index === 0
                                    ? 'left'
                                    : index === item.colors.length - 1
                                    ? 'right'
                                    : 'middle'
                            }
                        />
                    </Box>
                ))}
            </Flex>
        </Styled.Row>
    );
}
