import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
    type?: React.HTMLInputTypeAttribute;
    placeholder: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
};

export default function Input({
    type = "text",
    placeholder,
    registration,
    error,
}: InputProps) {
    return (
        <div className="w-full flex flex-col">
            <input
                type={type}
                {...registration}
                placeholder={placeholder}
                className={`border-b px-2 py-1 outline-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />

            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}