import {FieldError, UseFormRegister } from "react-hook-form";

interface TextAreaInputProps {
    label: string;
    placeholder: string;
    register: UseFormRegister<any>;
    error: FieldError | undefined;
}

const TextAreaInput = ({ label, placeholder, register, error}: TextAreaInputProps) => (
        <label htmlFor={label}>
            <p className="mb-1 text-md bold">
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </p>
            {error ? (
                <p className="error-line">{error.message}</p>
            ) : null}
            <textarea
                id={label}
                placeholder={placeholder}
                rows={3}
                className="primary-input resize-none"
                {...register(label)}
            />
        </label>
    );

export default TextAreaInput