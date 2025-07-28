import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3
                ${
                    active
                        ? 'border-brand-primaryLight bg-brand-primaryLight/10 text-brand-primary hover:bg-brand-primaryLight/20 focus:border-brand-primary hover:text-brand-primary'
                        : 'border-transparent text-brand-textMuted hover:border-brand-border hover:bg-brand-surface hover:text-brand-textDark focus:border-brand-border focus:bg-brand-surface focus:text-brand-textDark'
                }
                text-base font-medium transition duration-150 ease-in-out focus:outline-none
                ${className}`}
        >
            {children}
        </Link>
    );
}
