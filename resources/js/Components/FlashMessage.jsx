import { useEffect, useState } from 'react';

export default function FlashMessage({ message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timeout = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timeout);
        }
    }, [message]);

    return (
        <div
            className={`fixed bottom-5 right-5 z-50 max-w-sm px-8 py-5 rounded shadow-md transition-opacity duration-500 ease-in-out
                ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                bg-green-200 text-green-900`}
        >
            {message}
        </div>
    );
}
