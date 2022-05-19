import { useAnimation } from 'framer-motion';
import { memo, useState } from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Square } from '../Square/Square';
import { Text } from '../Text/Text';
import * as Styled from './ColorSquare.styles';
import { useTheme } from 'styled-components';
import { Colord } from 'colord';

function ColorSquare({ color }: { color: Colord }) {
    const animateColorSquare = useAnimation();
    const [showCopied, setShowCopied] = useState<boolean>(false);
    const theme = useTheme();

    const handleCopyClick = () => {
        animateColorSquare.set({ scale: 1, opacity: 1 });
        animateColorSquare.start({ scale: 1.5, opacity: 0 });

        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 2000);
    };

    const hex = color.toHex();

    return (
        <HoverCard.Root openDelay={100} closeDelay={100}>
            <HoverCard.Trigger>
                <Square dimension='80px'>
                    <CopyToClipboard text={hex}>
                        <Styled.ColorSquare background={hex} onClick={handleCopyClick} />
                    </CopyToClipboard>
                    <Styled.ColorSquareClickEffect
                        background={hex}
                        animate={animateColorSquare}
                        transition={{
                            duration: 0.5,
                        }}
                    />

                    <Styled.CenterColorText flex={1}>
                        <Text variant='code' color={color.isLight() ? 'dark' : 'light'}>
                            {!showCopied && hex}
                            {showCopied && 'Copied'}
                        </Text>
                    </Styled.CenterColorText>
                </Square>
            </HoverCard.Trigger>
            <Styled.HoverContent sideOffset={10}>
                <HoverCard.Arrow fill={theme.color.light} />
                <Text variant='code'>{color.toRgbString()}</Text>
            </Styled.HoverContent>
        </HoverCard.Root>
    );
}

export default memo(ColorSquare);
