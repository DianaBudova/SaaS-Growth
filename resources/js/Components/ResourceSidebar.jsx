export default function ResourceSidebar({ title, meta = [] }) {
    return (
        <aside className="w-full lg:w-1/4 bg-white rounded">
            <h1 className="text-xl font-semibold mb-2">{title}</h1>

            {meta.length > 0 && (
                <>
                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2 text-sm">
                        {meta.map(({ label, value }) => (
                            <p key={label}>
                                <span className="font-medium text-gray-700">{label}:</span>{' '}
                                {value ?? '--'}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </aside>
    );
}
