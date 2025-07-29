export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`
                inline-flex items-center justify-center
                rounded border border-stone-300
                bg-white
                px-5 py-2.5
                text-sm font-semibold uppercase tracking-wide
                text-stone-700
                shadow
                transition-all duration-200 ease-in-out
                hover:bg-stone-50 hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
