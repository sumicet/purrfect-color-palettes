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

function Home({ setBackgroundColor }: { setBackgroundColor: (backgroundColor: string) => void }) {
    const [color, setColor] = useState<Colord>(colord('#522CB8'));
    const theme = useTheme();
    const [value, setValue] = useState<string>('');
    const [mixColor, setMixColor] = useState<Colord>(colord('#ed3466'));

    const [debouncedValue] = useDebouncedValue(value, 100);

    useEffect(() => {
        if (!debouncedValue) {
            return;
        }

        const newColor = colord(debouncedValue);

        if (newColor.isValid()) {
            setColor(newColor);
        }
    }, [debouncedValue]);

    useEffect(() => {
        setValue(color.toHex().toUpperCase());
    }, [color]);

    return (
        <Flex flexDirection='column' alignItems='center'>
            <Flex marginBottom={theme.spacing.spacing64} flexDirection='column' alignItems='center'>
                <Text variant='header' color='light'>
                    Purrfect Color Palettes
                </Text>
                <Text variant='paragraph' color='light'>
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

                        <Box marginBottom={10} width='100%'>
                            <Input value={value} onChange={setValue} />
                        </Box>

                        <Flex>
                            <Flex marginRight='10px' flex={1}>
                                <Button onClick={() => setMixColor(color)} width='100%'>
                                    Set mix color
                                </Button>
                            </Flex>
                            <Flex flex={1}>
                                <Button
                                    onClick={() => setBackgroundColor(color.toHex())}
                                    width='100%'
                                >
                                    Set background
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>

                <ColorGrid color={color} mixColor={mixColor.toHex()} />
            </Flex>
        </Flex>
    );
}

export default Home;
