import { useTheme } from 'styled-components';
import { Color } from '../../../theme/default';

export function Paste({ color }: { color?: Color }) {
    const theme = useTheme();
    return (
        <svg
            width='18'
            height='22'
            viewBox='0 0 18 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C0.9 2 0 2.9 0 4V20C0 21.1 0.9 22 2 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2ZM9 2C9.55 2 10 2.45 10 3C10 3.55 9.55 4 9 4C8.45 4 8 3.55 8 3C8 2.45 8.45 2 9 2ZM15 20H3C2.45 20 2 19.55 2 19V5C2 4.45 2.45 4 3 4H4V5C4 6.1 4.9 7 6 7H12C13.1 7 14 6.1 14 5V4H15C15.55 4 16 4.45 16 5V19C16 19.55 15.55 20 15 20Z'
                fill={(color && theme.color[color]) || theme.color.lightDarker}
            />
        </svg>
    );
}
