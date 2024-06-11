export function Layout(props: {
  role?: string;
  title?: string;
  button?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { role = "main", title, button, children } = props;

  return (
    <div className="container px-4 pt-4 mx-auto max-w-[65rem]">
      <main role={role} className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
        <div className="col-span-4 flex justify-between items-center">
          <h3 className="font-bold text-2xl">{title}</h3>
          {button}
        </div>
        {children}
      </main>
    </div>
  );
}
