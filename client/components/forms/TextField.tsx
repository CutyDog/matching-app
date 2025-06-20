export default function TextField({
  label,
  name,
  type,
  autoComplete,
  value,
  onChange,
  required
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full appearance-none rounded-md border border-muted px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
        />
      </div>
    </div>
  )
}