import { colord } from 'colord';
import { CustomPicker, CustomPickerProps } from 'react-color';

import { Saturation, Hue } from 'react-color/lib/components/common';
import { useTheme } from 'styled-components';
import Box from '../Box/Box';
import Flex from '../Flex/Flex';
import * as Styled from './ColorPicker.styles';

function ColorPicker({ hex, hsl, hsv, onChange }: any) {
    const theme = useTheme();
    const size = theme.size.colorPicker;

    return (
        <Styled.ColorPicker>
            <div>
                <Flex flexDirection='column'>
                    <Flex>
                        <Box
                            position='relative'
                            width={size}
                            height={size}
                            marginBottom={theme.spacing.spacing16}
                            className='saturation-wrapper'
                        >
                            <Saturation
                                // @ts-ignore
                                hsl={hsl}
                                hsv={hsv}
                                onChange={onChange}
                                style={{ borderRadius: 8 }}
                            />
                        </Box>
                    </Flex>

                    <Box position='relative' width={size} height={10}>
                        {/* @ts-ignore */}
                        <Hue hsl={hsl} onChange={onChange} />
                    </Box>
                </Flex>
            </div>
        </Styled.ColorPicker>
    );
}

export default CustomPicker(ColorPicker);
