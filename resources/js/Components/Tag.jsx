export default function Tag({ children, color = 'default' }) {
    const colors = {
        default: 'bg-stone-200 text-stone-700',
        blue: 'bg-blue-200 text-blue-700',
        green: 'bg-green-200 text-green-700',
        red: 'bg-red-200 text-red-700',
        amber: 'bg-amber-200 text-amber-700',
    };

    return (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[color] || colors.default}`}>
            {children}
        </span>
    );
}
