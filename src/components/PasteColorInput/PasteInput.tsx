import { colord } from 'colord';
import { useTheme } from 'styled-components';
import Box from '../Box/Box';
import Flex from '../Flex/Flex';
import { Label } from '../Label/Label';
import { PasteInput, PasteInputProps } from '../PasteInput/PasteInput';
import { Square } from '../Square/Square';

interface PasteColorInputProps extends PasteInputProps {
    label: string;
}
export function PasteColorInput({ label, ...props }: PasteColorInputProps) {
    const theme = useTheme();
    const { value } = props;

    return (
        <Flex flexDirection='column'>
            <Box marginBottom='5px'>
                <Label label={label} />
            </Box>
            <Flex>
                <Square
                    dimension='34.39px'
                    background={colord(value).isValid() ? value : theme.color.light}
                    borderTopLeftRadius={theme.borderRadius}
                    borderBottomLeftRadius={theme.borderRadius}
                />
                <PasteInput
                    {...props}
                    inputStyle={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                />
            </Flex>
        </Flex>
    );
}
