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
                rounded border border-brand-secondaryBorder
                bg-brand-secondary
                px-5 py-2.5
                text-sm font-semibold uppercase tracking-wide
                text-brand-secondaryText
                shadow
                transition-all duration-200 ease-in-out
                hover:bg-brand-secondaryHover hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-brand-primaryLight focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
