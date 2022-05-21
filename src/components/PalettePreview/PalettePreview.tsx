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
                    <Box
                        background={preview.box}
                        borderRadius={theme.borderRadius}
                        marginBottom={10}
                        border={`3px solid ${preview.border}`}
                        padding='20px'
                    >
                        <Center flex={1} flexDirection='column'>
                            <Box marginBottom='20px'>
                                <Text variant='paragraphBig' customColor={preview.title}>
                                    Spring ocean
                                </Text>
                            </Box>
                            <Box marginBottom='20px'>
                                <Text variant='paragraph' customColor={preview.paragraph}>
                                    Swaying gently
                                </Text>
                            </Box>
                            <Text variant='paragraphSmall' customColor={preview.caption}>
                                All day long
                            </Text>
                        </Center>
                    </Box>
                </Center>
            </Box>
        </Flex>
    );
}
