export default function Table({ columns, data, renderRow }) {
    return (
        <div className="overflow-x-auto border rounded">
            <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                scope="col"
                                className={`px-6 py-3 text-xs font-medium uppercase tracking-wider ${col.align === 'right' ? 'text-right' : 'text-left'} text-stone-500`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-200">
                    {data.map((item) => renderRow(item))}
                </tbody>
            </table>
        </div>
    );
}

Table.Row = function TableRow({ children }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap text-stone-800 font-medium">
            {children}
        </td>
    );
};