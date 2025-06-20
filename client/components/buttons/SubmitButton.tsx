export default function SubmitButton({
  children,
  disabled
}: {
  children: React.ReactNode,
  disabled?: boolean
}) {
  return (
    <button
      type="submit"
      className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-bold text-foreground shadow-sm"
      style={{ backgroundColor: "oklch(58.5% .233 277.117)" }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}