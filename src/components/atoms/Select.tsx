import React from 'react';

interface SelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

export const Select = ({ value, onChange, name, required, disabled, children }: SelectProps) => (
    <select
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed bg-white"
    >
        {children}
    </select>
); 