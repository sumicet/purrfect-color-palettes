import { CustomPicker, CustomPickerProps } from 'react-color';

import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
import { useTheme } from 'styled-components';
import Box from '../Box/Box';
import Flex from '../Flex/Flex';
import * as Styled from './ColorPicker.styles';

function ColorPicker({ hex, hsl, hsv, onChange }: any) {
    const theme = useTheme();
    return (
        <Styled.ColorPicker color={hex}>
            <Flex flexDirection='column'>
                <Box
                    position='relative'
                    width='15vw'
                    height={300}
                    marginBottom={theme.spacing.spacing16}
                >
                    <Saturation
                        // @ts-ignore
                        hsl={hsl}
                        hsv={hsv}
                        onChange={onChange}
                        style={{ borderRadius: 8 }}
                    />
                </Box>

                <Box position='relative' width='15vw' height={8}>
                    {/* @ts-ignore */}
                    <Hue hsl={hsl} onChange={onChange} />
                </Box>
            </Flex>
        </Styled.ColorPicker>
    );
}

export default CustomPicker(ColorPicker);
