import {
    AnimatePresence,
    AnimateSharedLayout,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import { memo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Square } from '../Square/Square';
import { Text } from '../Text/Text';
import * as Styled from './SelectedColorCard.styles';

function ColorSquare({ color, isLight }: { color: string; isLight: boolean }) {
    const animateColorSquare = useAnimation();
    const [showCopied, setShowCopied] = useState<boolean>(false);

    const handleCopyClick = () => {
        animateColorSquare.set({ scale: 1, opacity: 1 });
        animateColorSquare.start({ scale: 1.5, opacity: 0 });

        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 2000);
    };

    return (
        <Square dimension='100%'>
            <CopyToClipboard text={color}>
                <Styled.ColorSquare background={color} onClick={handleCopyClick} />
            </CopyToClipboard>
            <Styled.ColorSquareClickEffect
                background={color}
                animate={animateColorSquare}
                transition={{
                    duration: 0.5,
                }}
            />

            <Styled.CenterColorText flex={1}>
                <Text variant='code' color={isLight ? 'dark' : 'light'}>
                    {!showCopied && color}
                    {showCopied && 'Copied'}
                </Text>
            </Styled.CenterColorText>
        </Square>
    );
}

export default memo(ColorSquare);
