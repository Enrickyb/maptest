import "./SelectInput.css";

export default function SelectInput({ options, value, onChange, defaultv }) {
  return (
    <select
      className="classic"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={value}
    >
      {defaultv && (
        <option value="Selecione" defaultChecked>
          {defaultv}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
