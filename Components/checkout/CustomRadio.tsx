
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/validations"; // Ensure this path is correct

interface CustomRadioProps {
  name: keyof CheckoutFormValues;
  value: string;
  label: string;
  currentValue: string;
  register: UseFormRegister<CheckoutFormValues>;
}

const CustomRadio = ({
  name,
  value,
  label,
  currentValue,
  register,
}: CustomRadioProps) => {
  const isChecked = currentValue === value;
  const containerClasses = `
    flex items-center p-4 border rounded-lg cursor-pointer transition-all
    ${
      isChecked
        ? "border-primary bg-transparent" 
        : "border-[#CFCFCF] hover:border-primary bg-transparent" 
    }
  `;

  return (
    <label className={containerClasses}>
      <input
        {...register(name)}
        type="radio"
        value={value}
        className="
          appearance-none w-5 h-5 mr-4 rounded-full border border-gray-300 
          checked:border-[6px] checked:border-primary checked:bg-white 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          transition-colors
        "
      />
      <span className="text-[14px] font-bold">{label}</span>
    </label>
  );
};

export default CustomRadio;
