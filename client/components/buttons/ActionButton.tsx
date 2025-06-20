export default function ActionButton({
  children,
  style,
  onClick,
  disabled
}: {
  children: React.ReactNode,
  style?: React.CSSProperties,
  onClick: () => void,
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      className="w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-bold text-foreground shadow-sm"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}