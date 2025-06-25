type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (input: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
}

export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) => {
  const _options = [
    { label: "選択してください", value: "" },
    ...options,
  ]

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="block w-full appearance-none rounded-md border border-muted px-3 py-2 shadow-sm sm:text-sm"
      >
        {_options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}