// FILE: Components/checkout/CustomRadio.tsx

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

  // Dynamic classes for active state (border and text color)
  const containerClasses = `
    flex items-center p-4 border rounded-lg cursor-pointer transition-all
    ${
      isChecked
        ? "border-[#D87D4A] bg-transparent" // Active state: primary color border
        : "border-[#CFCFCF] hover:border-[#D87D4A] bg-transparent" // Default state
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
          checked:border-[6px] checked:border-[#D87D4A] checked:bg-white 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D87D4A] 
          transition-colors
        "
        // This input element handles the custom dot color via `checked:border-`
      />
      <span className="text-[14px] font-bold">{label}</span>
    </label>
  );
};

export default CustomRadio;
