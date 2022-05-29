import { Reorder } from 'framer-motion';
import styled from 'styled-components';

// box-shadow: ${props => props.theme.shadow.default};
export const Row = styled(Reorder.Item)`
    margin-top: ${props => props.theme.spacing.spacing16};

    &:first-of-type {
        margin-top: 0px;
    }
`;
