import Flex from '../../Flex/Flex';
import { Slider, SliderProps } from '../../Slider/Slider';
import { Action } from '../ColorGrid';
import { Settings as SettingsIcon } from '../../../assets/icons/Settings/Settings';
import styled, { useTheme } from 'styled-components';
import { HoverCard } from '../../HoverCard';
import Box from '../../Box/Box';

interface SettingsProps extends SliderProps {
    action: Action;
}

const SettingsIconContainer = styled(Flex)`
    align-items: center;
    justify-content: center;
    &:hover {
        path {
            fill: ${props => props.theme.color.light};
        }
    }
`;

export function Settings({ action, ...sliderProps }: SettingsProps) {
    const theme = useTheme();

    return (
        <>
            <HoverCard.Root>
                <HoverCard.Trigger>
                    <SettingsIconContainer>
                        <SettingsIcon />
                    </SettingsIconContainer>
                </HoverCard.Trigger>
                <HoverCard.Content side='right'>
                    <HoverCard.Arrow />
                    <Flex>
                        {!['shades', 'tints', 'tones'].includes(action) && (
                            <Slider {...sliderProps} />
                        )}
                    </Flex>
                </HoverCard.Content>
            </HoverCard.Root>
        </>
    );
}
