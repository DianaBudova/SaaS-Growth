export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-brand-textDark ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
