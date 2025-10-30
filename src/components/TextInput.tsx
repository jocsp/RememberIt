import { FieldError, UseFormRegister } from "react-hook-form";

interface TextInputProps {
    label: string;
    placeholder: string;
    register: UseFormRegister<any>;
    error: FieldError | undefined;
}


const TextInput = ({label, placeholder, register, error}: TextInputProps) => (
      <label htmlFor={label}>
          <p className="mb-1 text-md bold">
              {label.charAt(0).toUpperCase() + label.slice(1)}
          </p>
          {error ? (
              <p className="error-line">{error.message}</p>
          ) : null}
          <input
              id={label}
              type="text"
              placeholder={placeholder}
              className="primary-input"
              {...register(label)}
          />
      </label>
  )

export default TextInput