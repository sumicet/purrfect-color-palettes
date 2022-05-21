import { colord } from 'colord';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled, { useTheme } from 'styled-components';
import Box from '../Box/Box';
import Center from '../Center/Center';
import Flex from '../Flex/Flex';
import { Label } from '../Label/Label';
import { PasteInput, PasteInputProps } from '../PasteInput/PasteInput';
import { Square } from '../Square/Square';
import { Copy } from '../../assets/icons/Copy/Copy';

interface PasteColorInputProps extends PasteInputProps {
    label: string;
}

const StyledBox = styled(Box)`
    cursor: pointer;

    svg {
        max-width: 12px;
        max-height: 12px;
    }

    &:hover {
        background: ${props => props.theme.color.inputLighter};
    }
`;

export function PasteColorInput({ label, ...props }: PasteColorInputProps) {
    const theme = useTheme();
    const { value } = props;

    const colorObject = colord(value);

    return (
        <Flex flexDirection='column'>
            <Box marginBottom='5px'>
                <Label label={label} />
            </Box>
            <Flex>
                <CopyToClipboard text={value}>
                    <StyledBox
                        paddingRight='10px'
                        background={theme.color.input}
                        borderTopLeftRadius={theme.borderRadius}
                        borderBottomLeftRadius={theme.borderRadius}
                    >
                        <Square dimension='34.39px'>
                            <Center flex={1}>
                                <Square
                                    background={colorObject.isValid() ? value : theme.color.light}
                                    borderRadius='50%'
                                    dimension='calc(100% - 10px)'
                                    marginLeft='10px'
                                >
                                    <Center flex={1}>
                                        <Copy
                                            color={
                                                colorObject.isLight() ? 'darkHover' : 'lightHover'
                                            }
                                        />
                                    </Center>
                                </Square>
                            </Center>
                        </Square>
                    </StyledBox>
                </CopyToClipboard>
                <PasteInput
                    {...props}
                    inputStyle={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        paddingLeft: 0,
                    }}
                />
            </Flex>
        </Flex>
    );
}
