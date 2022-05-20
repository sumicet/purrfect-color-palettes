import { useState } from 'react';

export function useCopied(main: string) {
    const [text, setText] = useState<string>(main);

    const copy = () => {
        setText('Copied');

        setTimeout(() => {
            setText(main);
        }, 1000);
    };

    return { text, copy };
}
