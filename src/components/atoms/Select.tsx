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
    <select value={value} onChange={onChange} name={name} required={required} disabled={disabled}>
        {children}
    </select>
); 