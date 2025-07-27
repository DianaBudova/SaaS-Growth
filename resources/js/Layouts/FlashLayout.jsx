import { usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function FlashLayout({ children }) {
    const { flash } = usePage().props;

    return (
        <>
            <FlashMessage type="success" message={flash?.success} />
            <FlashMessage type="info" message={flash?.info} />
            <FlashMessage type="error" message={flash?.error} />

            {children}
        </>
    );
}
