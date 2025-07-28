export default function ResourceSidebar({ title, meta = [] }) {
    return (
        <aside className="w-full lg:w-1/4 bg-brand-bg rounded">
            <h1 className="text-xl font-semibold mb-2 text-brand-textDark">{title}</h1>

            {meta.length > 0 && (
                <>
                    <div className="border-t border-brand-border pt-4 mt-4 space-y-2 text-sm">
                        {meta.map(({ label, value }) => (
                            <p key={label}>
                                <span className="font-medium text-brand-textDark">{label}:</span>{' '}
                                <span className="text-brand-textMuted">{value ?? '--'}</span>
                            </p>
                        ))}
                    </div>
                </>
            )}
        </aside>
    );
}
