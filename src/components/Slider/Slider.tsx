import * as RadixSlider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from 'rooks';
import { useTheme } from 'styled-components';
import { isValidNumber } from '../../utils/math';
import Box from '../Box/Box';
import Flex from '../Flex/Flex';
import { SmallInput } from '../Input/SmallInput';

export interface SliderProps {
    value: string;
    onValueChange: (v: string) => void;
    step?: number;
    max?: number;
    min?: number;
}

export function Slider({ value, onValueChange, step = 0.1, max = 1, min = 0 }: SliderProps) {
    const theme = useTheme();
    const [input, setInput] = useState<string>('');

    const [debouncedInput] = useDebouncedValue(input, 100);

    useEffect(() => {
        if (!debouncedInput || !isValidNumber(debouncedInput)) {
            return;
        }

        const number = parseFloat(debouncedInput);
        if (number >= min && number <= max) {
            onValueChange(debouncedInput);
        }
    }, [debouncedInput]);

    useEffect(() => {
        setInput(value.toString());
    }, [value]);

    return (
        <Flex alignItems='center'>
            <Box marginRight={theme.spacing.spacing08}>
                <SmallInput value={input} onChange={setInput} backgroundColor='inputLighter' />
            </Box>
            <RadixSlider.Root
                value={[parseFloat(value)]}
                onValueChange={(v: number[]) => onValueChange(v[0].toString())}
                defaultValue={[50]}
                max={max}
                min={min}
                step={step}
                style={{
                    width: 200,
                    maxWidth: 200,
                    height: 3,
                    position: 'relative',
                    background: theme.color.light,
                    borderRadius: '9999px',
                }}
            >
                <RadixSlider.Track>
                    <RadixSlider.Range
                        style={{
                            background: theme.color.button,
                            height: 3,
                            position: 'absolute',
                            borderRadius: '9999px',
                        }}
                    />
                </RadixSlider.Track>
                <RadixSlider.Thumb
                    style={{
                        background: theme.color.button,
                        width: '11px',
                        height: '11px',
                        borderRadius: '9999px',
                        display: 'flex',
                        transform: 'translateY(-4px)',
                    }}
                />
            </RadixSlider.Root>
        </Flex>
    );
}
