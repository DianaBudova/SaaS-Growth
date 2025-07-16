import { useEffect, useRef, useState } from 'react';

export default function FlashMessage({ message, duration = 4000 }) {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (!message) {
            return;
        }

        setVisible(true);

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setVisible(false), duration);

        return () => clearTimeout(timerRef.current);
    }, [message, duration]);

    const handleClose = () => {
        clearTimeout(timerRef.current);
        setVisible(false);
    };

    return (
        <div
            role="alert"
            className={`
                fixed bottom-8 right-8 z-50 max-w-sm
                px-8 py-5 pr-14 rounded shadow
                bg-green-200 text-green-900
                transition-opacity duration-400
                ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
        >
            {message}

            <button
                onClick={handleClose}
                aria-label="Close notification"
                className="
                    absolute top-3 right-3
                    text-green-700 hover:text-green-900
                    focus:outline-none
                "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
