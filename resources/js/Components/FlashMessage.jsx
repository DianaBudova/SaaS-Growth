import { useEffect, useRef, useState } from 'react';

export default function FlashMessage({ type = 'info', message, duration = 4000 }) {
    const [visible,  setVisible]  = useState(false);
    const [progress, setProgress] = useState(100);

    const rafIdRef     = useRef(null);
    const startTimeRef = useRef(0);
    const remainRef    = useRef(duration);

    const stopTimer = () => cancelAnimationFrame(rafIdRef.current);

    const startTimer = () => {
        const start = performance.now();
        startTimeRef.current = start;

        const tick = (now) => {
            const elapsed = now - start;
            const percent = Math.max(0, 100 - (elapsed / remainRef.current) * 100);
            setProgress(percent);

            if (percent > 0) {
                rafIdRef.current = requestAnimationFrame(tick);
            } else {
                setVisible(false);
            }
        };

        rafIdRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        if (!message) return;

        restoreProgress();

        startTimer();

        return stopTimer;
    }, [message, duration]);

    const handleMouseEnter = () => {
        const elapsed = performance.now() - startTimeRef.current;
        remainRef.current = Math.max(0, remainRef.current - elapsed);

        restoreProgress();

        stopTimer();
    };

    const handleMouseLeave = () => {
        if (visible && remainRef.current > 0) {
            startTimer();
        }
    };

    const restoreProgress = () => {
        setVisible(true);
        setProgress(100);
        remainRef.current = duration;
    };

    const close = () => {
        stopTimer();
        setVisible(false);
    };

    const paletteClasses = {
        success: {
            bg: 'bg-green-200',
            text: 'text-green-900',
            close: 'text-green-700 hover:text-green-900',
            progress: 'bg-green-600',
        },
        info: {
            bg: 'bg-stone-200',
            text: 'text-stone-900',
            close: 'text-stone-700 hover:text-stone-900',
            progress: 'bg-stone-600',
        },
        error: {
            bg: 'bg-red-200',
            text: 'text-red-900',
            close: 'text-red-700 hover:text-red-900',
            progress: 'bg-red-600',
        }
    };

    const classes = paletteClasses[type] || paletteClasses.info;

    return (
        <div
            role="alert"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
                fixed bottom-8 right-8 z-50 max-w-sm
                px-8 py-5 pr-14 rounded shadow overflow-hidden
                transition-opacity duration-300
                ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                ${classes.bg} ${classes.text}
            `}
        >
            {message}

            <button
                onClick={close}
                aria-label="Close notification"
                className={`absolute top-3 right-3 ${classes.close} focus:outline-none`}
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="absolute bottom-0 left-0 h-1 w-full bg-black/10">
                <div
                    style={{ transform: `scaleX(${progress / 100})` }}
                    className={`origin-left h-full transition-transform duration-75 ease-linear ${classes.progress}`}
                />
            </div>
        </div>
    );
}
