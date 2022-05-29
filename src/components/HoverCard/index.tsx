import * as HoverCardUI from '@radix-ui/react-hover-card';
import styled, { useTheme } from 'styled-components';

type ContentProps = React.ComponentProps<typeof HoverCardUI.Content>;
type ArrowProps = React.ComponentProps<typeof HoverCardUI.Arrow>;
type RootProps = React.ComponentProps<typeof HoverCardUI.Root>;

const StyledContent = styled(HoverCardUI.Content)<ContentProps>`
    background: ${props => props.theme.color.input};
    padding: ${props => props.theme.spacing.spacing16};
    border-radius: ${props => props.theme.borderRadius};
`;

function Content(props: ContentProps) {
    return <StyledContent sideOffset={10} {...props} />;
}

function Arrow(props: ArrowProps) {
    const theme = useTheme();
    return <HoverCardUI.Arrow fill={theme.color.input} {...props} />;
}

function Root(props: RootProps) {
    return <HoverCardUI.Root openDelay={50} closeDelay={50} {...props} />;
}

export const HoverCard = {
    Content,
    Trigger: HoverCardUI.Trigger,
    Arrow,
    Root,
};
