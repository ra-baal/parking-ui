import React from 'react';

interface InputProps {
    type?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
}

export const Input = ({ type = 'text', value, onChange, placeholder, name, disabled }: InputProps) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
    />
);
