const columns = [
  {
    title: "Marketplace",
    links: ["Browse All Agents", "Collections", "Submit an Agent", "Marketplace Guidelines"],
  },
  {
    title: "Product",
    links: ["Roadmap", "Documentation", "API Reference", "Status"],
  },
  {
    title: "Community",
    links: ["Discord", "GitHub", "Twitter", "Blog"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Security", "Refund Policy"],
  },
];

export function FooterSection() {
  return (
    <footer className="rounded-3xl border border-border/80 bg-white px-8 py-10 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title} className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {column.title}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link}>
                  <a className="transition hover:text-primary" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Every agent is transparent, auditable, and runs securely in your browser. Join 1,500+
        workspaces automating with AGIPO.
      </p>
    </footer>
  );
}
