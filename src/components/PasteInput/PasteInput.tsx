import { CSSProperties } from 'react';
import styled, { useTheme } from 'styled-components';
import { Paste } from '../../assets/icons/Paste/Paste';
import Box from '../Box/Box';
import Flex from '../Flex/Flex';
import { Input, InputProps } from '../Input/Input';
import { Label } from '../Label/Label';

export interface PasteInputProps extends InputProps {
    label?: string;
    inputStyle?: CSSProperties;
}

const PasteContainer = styled(Flex)`
    cursor: pointer;
    border-top-right-radius: ${props => props.theme.borderRadius};
    border-bottom-right-radius: ${props => props.theme.borderRadius};

    &:hover {
        background: ${props => props.theme.color.inputLighter};

        path {
            fill: ${props => props.theme.color.lightHover};
        }
    }
`;

export function PasteInput({ label, inputStyle, ...props }: PasteInputProps) {
    const theme = useTheme();
    const { onChange } = props;

    const handlePaste = async () => {
        const text = await navigator.clipboard.readText();
        onChange(text);
    };

    return (
        <Flex flexDirection='column' width='100%'>
            {label && (
                <Box marginBottom='5px'>
                    <Label label={label} />
                </Box>
            )}
            <Flex>
                <Input
                    {...props}
                    style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        ...inputStyle,
                    }}
                />
                <PasteContainer
                    background={theme.color.input}
                    alignItems='center'
                    paddingRight='10px'
                    paddingLeft='10px'
                    onClick={handlePaste}
                >
                    <Paste />
                </PasteContainer>
            </Flex>
        </Flex>
    );
}
