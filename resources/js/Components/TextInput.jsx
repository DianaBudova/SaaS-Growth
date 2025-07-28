import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            ref={localRef}
            className={`
                rounded
                border border-brand-border
                bg-brand-bg
                text-brand-textDark
                shadow-sm
                placeholder:text-brand-textMuted
                focus:border-brand-primaryLight
                focus:ring-1 focus:ring-brand-primaryLight
                disabled:bg-gray-100 disabled:cursor-not-allowed
                ${className}
            `}
        />
    );
});
