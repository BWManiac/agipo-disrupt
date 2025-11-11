export function FooterSection() {
  return (
    <footer className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <FooterColumn
          title="Product"
          links={["Roadmap", "Documentation", "API Reference", "Status"]}
        />
        <FooterColumn
          title="Community"
          links={["Discord", "GitHub", "Twitter", "Blog"]}
        />
        <FooterColumn
          title="Company"
          links={["About", "Careers", "Contact"]}
        />
        <FooterColumn
          title="Legal"
          links={["Terms", "Privacy", "Security"]}
        />
      </div>
      <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Built for transparency and trust. All agent executions are visible, auditable, and run securely in your browser.
      </p>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link}>
            <a className="transition hover:text-primary" href="#">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
