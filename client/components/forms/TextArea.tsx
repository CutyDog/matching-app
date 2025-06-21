export default function TextArea({
  label,
  name,
  rows,
  value,
  onChange,
  required,
  disabled,
}: {
  label: string;
  name: string;
  rows: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${disabled ? 'text-gray-400' : ''}`}
        />
      </div>
    </div>
  );
}