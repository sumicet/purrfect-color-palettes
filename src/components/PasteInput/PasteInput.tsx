import styled, { useTheme } from 'styled-components';
import { Paste } from '../../assets/icons/Paste/Paste';
import Box from '../Box/Box';
import Flex from '../Flex/Flex';
import { Input, InputProps } from '../Input/Input';

interface PasteInputProps extends InputProps {}

const PasteContainer = styled(Flex)`
    svg {
        max-width: 16px;
        max-height: 16px;
    }

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

export function PasteInput({ ...props }: PasteInputProps) {
    const theme = useTheme();
    const { onChange } = props;

    const handlePaste = async () => {
        const text = await navigator.clipboard.readText();
        onChange(text);
    };

    return (
        <Flex>
            <Input
                {...props}
                style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
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
    );
}
