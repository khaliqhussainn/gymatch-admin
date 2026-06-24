export default function Table({ columns, data, emptyMessage = "No data found." }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#2A2A30]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left text-xs font-semibold text-[#8A8A94] uppercase tracking-widest py-3 px-4 first:pl-0"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-[#64646C] text-sm py-12"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id ?? i}
                className="border-b border-[#2A2A30] hover:bg-[#1E1E22] transition-colors duration-100"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3.5 px-4 first:pl-0 text-sm">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
