import LoadingSpinner from "../LoadingSpinner";

export default function PrimaryButton({
    className = '',
    disabled = false,
    loading = false,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`
                inline-flex items-center justify-center
                rounded
                bg-stone-50
                px-5 py-2.5
                text-sm font-semibold uppercase tracking-wide
                text-stone-900
                transition-all duration-200 ease-in-out
                hover:bg-stone-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                active:bg-stone-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
            disabled={disabled || loading}
        >
            {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <LoadingSpinner className="!w-4 !h-4 border-white" />
                </div>
            ) : children}
        </button>
    );
}
