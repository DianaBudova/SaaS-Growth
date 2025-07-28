export default function Table({ columns, data, renderRow }) {
    return (
        <div className="overflow-x-auto border border-brand-border rounded">
            <table className="min-w-full divide-y divide-brand-border">
                <thead className="bg-brand-surface">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                scope="col"
                                className={`px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                                    col.align === 'right' ? 'text-right' : 'text-left'
                                } text-brand-textMuted`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-brand-bg divide-y divide-brand-border">
                    {data.map((item) => renderRow(item))}
                </tbody>
            </table>
        </div>
    );
}

Table.Row = function TableRow({ children }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap text-brand-textDark font-medium">
            {children}
        </td>
    );
};