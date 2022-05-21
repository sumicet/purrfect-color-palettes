import { useTheme } from 'styled-components';
import { Preview } from '../../pages/Home/Home';
import Box from '../Box/Box';
import Center from '../Center/Center';
import Flex from '../Flex/Flex';
import { Square } from '../Square/Square';
import { Text } from '../Text/Text';

export function PalettePreview({ preview }: { preview: Preview }) {
    const theme = useTheme();

    console.log(preview);

    return (
        <Flex>
            <Box
                background={preview.wrapper}
                borderRadius={theme.borderRadius}
                width={theme.size.colorPicker}
                padding='20px'
            >
                <Center flex={1} flexDirection='column'>
                    <Square
                        dimension={theme.size.colorPicker / 2}
                        background={preview.box}
                        borderRadius={theme.borderRadius}
                        marginBottom={10}
                        border={`3px solid ${preview.border}`}
                    >
                        <Center flex={1}>
                            <Text variant='code' customColor={preview.text}>
                                Sample text
                            </Text>
                        </Center>
                    </Square>
                </Center>
            </Box>
        </Flex>
    );
}
