import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputGroupProps<TFieldValues extends FieldValues> {
  name: keyof TFieldValues;
  label: string;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  type?: "text" | "email" | "tel" | "password" | "number";
}

const InputGroup = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  error,
  type = "text",
}: InputGroupProps<TFieldValues>) => {
  const isError = !!error;
  const inputClasses = `
    w-full px-6 py-4 border rounded-lg text-black bg-white
    placeholder:text-black/40 text-[14px] font-bold
    ${
      isError
        ? "border-red-500 ring-red-500 focus:outline-none focus:ring-1"
        : "border-[#CFCFCF] focus:border-[#D87D4A] focus:ring-1 focus:ring-[#D87D4A] focus:outline-none"
    }
  `;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={name as string} className="text-[12px] font-bold">
          {" "}
          {/* Cast name to string for htmlFor */}
          {label}
        </label>
        {isError && (
          <span className="text-[12px] font-medium text-red-500">{error}</span>
        )}
      </div>

      {/* register(name as Path<TFieldValues>) enforces correct name typing */}
      <input
        id={name as string}
        {...register(name as Path<TFieldValues>)}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputGroup as typeof InputGroup; // Exporting correctly for generic components
