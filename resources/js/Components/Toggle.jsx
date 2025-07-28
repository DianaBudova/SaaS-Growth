export default function Toggle({ checked, onChange }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${checked ? "bg-brand-primaryLight" : "bg-brand-border"}
            `}
            role="switch"
            aria-checked={checked}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${checked ? "translate-x-6" : "translate-x-1"}
                `}
            />
        </button>
    );
}
