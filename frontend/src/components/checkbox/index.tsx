import { Checkbox } from "./based";

interface CustomCheckbox {
  defaultChecked?: boolean | "indeterminate";
  checked?: boolean | "indeterminate";
  onCheckedChange?: () => void;
  disabled?: boolean;
  required?: boolean;
  styleLabel?: string;
  label?: string;
  value?: string;
  id?: string;
}

const CustomCheckbox: React.FC<CustomCheckbox> = ({
  defaultChecked,
  checked,
  onCheckedChange,
  disabled,
  required,
  styleLabel,
  label,
  value,
  id,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        value={value}
      />
      <label htmlFor={id} className={styleLabel}>
        {label}
      </label>
    </div>
  );
};
export { CustomCheckbox, Checkbox };
