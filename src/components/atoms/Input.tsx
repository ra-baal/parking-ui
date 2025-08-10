import React from 'react';

interface InputProps {
    type?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    min?: string | number;
    max?: string | number;
    step?: string | number;
}

export const Input = ({ type = 'text', value, onChange, placeholder, name, disabled, ...props }: InputProps) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed placeholder:text-slate-400"
        {...props}
    />
);
