import 'styled-components';
import { theme } from './default';

declare module 'styled-components' {
    type Theme = typeof theme;
    export interface DefaultTheme extends Theme {}
}
