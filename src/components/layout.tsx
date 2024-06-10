export function Layout(props: { role?: string; children: React.ReactNode }) {
  const { role = "main", children } = props;

  return (
    <div className="container mx-auto max-w-[65rem]">
      <main
        role={role}
        className="grid gap-4 md:grid-cols-4 lg:grid-cols-4 lg:gap-8"
      >
        {children}
      </main>
    </div>
  );
}
