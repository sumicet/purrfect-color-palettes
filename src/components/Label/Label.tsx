import { Text } from '../Text/Text';

export function Label({ label }: { label: string }) {
    return (
        <Text variant='code' color='light'>
            {label.toUpperCase()}
        </Text>
    );
}
