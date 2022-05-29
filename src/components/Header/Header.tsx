import { useTheme } from 'styled-components';
import Flex from '../Flex/Flex';
import { Text } from '../Text/Text';

export function Header() {
    const theme = useTheme();
    return (
        <Flex paddingTop={theme.spacing.spacing32} paddingBottom={theme.spacing.spacing32}>
            <Text variant='header' color='light'>
                Purrfect color picker
            </Text>
        </Flex>
    );
}
