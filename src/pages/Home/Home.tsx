import { useEffect, useState } from 'react';
import Box from '../../components/Box/Box';
// @ts-ignore
import { Colord, colord, extend } from 'colord';
import { Text } from '../../components/Text/Text';
import { useDebouncedValue } from 'rooks';
import mixPlugin from 'colord/plugins/mix';
import Flex from '../../components/Flex/Flex';
import Center from '../../components/Center/Center';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import { ColorGrid } from '../../components/ColorGrid/ColorGrid';
import { useTheme } from 'styled-components';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { PalettePreview } from '../../components/PalettePreview/PalettePreview';
import { PasteInput } from '../../components/PasteInput/PasteInput';
import { PasteColorInput } from '../../components/PasteColorInput/PasteColorInput';

extend([mixPlugin]);

export const actions = [
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

export interface Preview {
    wrapper: string;
    box: string;
    border: string;
    title: string;
    paragraph: string;
    caption: string;
}

function Home({
    backgroundColor,
    setBackgroundColor,
}: {
    backgroundColor: string;
    setBackgroundColor: (backgroundColor: string) => void;
}) {
    const [color, setColor] = useState<Colord>(colord('#522CB8'));
    const theme = useTheme();
    const [colorInput, setColorInput] = useState<string>('');
    const [mixColorInput, setMixColorInput] = useState<string>('#ed3466');
    const [preview, setPreview] = useState<Preview>({
        wrapper: '#bdabeb',
        box: '#140c1d',
        title: '#ffffff',
        border: '#3e00e4',
        paragraph: '#ffffffbf',
        caption: '#de3270',
    });

    const [debouncedColorInput] = useDebouncedValue(colorInput, 100);

    useEffect(() => {
        if (!debouncedColorInput) {
            return;
        }

        const newColor = colord(debouncedColorInput);

        if (newColor.isValid()) {
            setColor(newColor);
        }
    }, [debouncedColorInput]);

    useEffect(() => {
        setColorInput(color.toHex().toUpperCase());
    }, [color]);

    return (
        <Flex flexDirection='column' alignItems='center'>
            <Flex marginBottom={theme.spacing.spacing64} flexDirection='column' alignItems='center'>
                <Text variant='header' color='light'>
                    Purrfect Color Palettes
                </Text>
                <Text variant='paragraph' color='lightDarker'>
                    Consistent AF.
                </Text>
            </Flex>

            <Flex>
                <Box marginRight={theme.spacing.spacing32}>
                    <Flex flexDirection='column'>
                        <Box marginBottom={20}>
                            <ColorPicker
                                color={color.toHex()}
                                onChange={(c: any) => {
                                    setColor(colord(c.hex));
                                }}
                            />
                        </Box>

                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='selected color'
                                value={colorInput}
                                onChange={setColorInput}
                            />
                        </Box>
                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='mix color'
                                value={mixColorInput}
                                onChange={setMixColorInput}
                            />
                        </Box>
                        <Box marginBottom='32px' width='100%'>
                            <PasteInput
                                label='website background'
                                value={backgroundColor}
                                onChange={setBackgroundColor}
                            />
                        </Box>

                        <Box marginBottom={20}>
                            <PalettePreview preview={preview} />
                        </Box>
                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='preview background'
                                // TODO utils valid color or fallback color
                                value={preview.wrapper}
                                onChange={value =>
                                    setPreview(oldPreview => ({ ...oldPreview, wrapper: value }))
                                }
                            />
                        </Box>
                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='preview border'
                                value={preview.border}
                                onChange={value =>
                                    setPreview(oldPreview => ({ ...oldPreview, border: value }))
                                }
                            />
                        </Box>
                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='preview box'
                                value={preview.box}
                                onChange={value =>
                                    setPreview(oldPreview => ({ ...oldPreview, box: value }))
                                }
                            />
                        </Box>
                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='preview title'
                                value={preview.title}
                                onChange={value =>
                                    setPreview(oldPreview => ({ ...oldPreview, title: value }))
                                }
                            />
                        </Box>
                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='preview paragraph'
                                value={preview.paragraph}
                                onChange={value =>
                                    setPreview(oldPreview => ({ ...oldPreview, paragraph: value }))
                                }
                            />
                        </Box>
                        <Box marginBottom='10px' width='100%'>
                            <PasteColorInput
                                label='preview text'
                                value={preview.caption}
                                onChange={value =>
                                    setPreview(oldPreview => ({ ...oldPreview, caption: value }))
                                }
                            />
                        </Box>
                    </Flex>
                </Box>

                <ColorGrid color={color} mixColor={mixColorInput} />
            </Flex>
        </Flex>
    );
}

export default Home;
