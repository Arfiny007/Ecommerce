import { SIZE_GUIDE } from "@/constants/content/support";

export function SizeGuideTables() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {SIZE_GUIDE.tables.map((table) => (
        <div key={table.title}>
          <h3 className="mb-4 font-display text-xl font-light md:text-2xl">
            {table.title}
          </h3>
          <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border-subtle">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-muted">
                  {table.headers.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-editorial text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border-subtle last:border-0">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-4 py-3 text-muted-foreground"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <ul className="space-y-2 text-sm text-muted-foreground">
        {SIZE_GUIDE.notes.map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden>·</span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
