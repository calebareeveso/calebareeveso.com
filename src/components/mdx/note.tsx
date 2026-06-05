export default function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-secondary/10 rounded-md px-3 py-2 my-4 text-sm text-secondary">
      {children}
    </div>
  );
}
