import React from 'react';

interface DateTimeInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    required?: boolean;
}

export const DateTimeInput = ({ value, onChange, name, required }: DateTimeInputProps) => (
    <input
        type="datetime-local"
        value={value}
        onChange={onChange}
        name={name}
        required={required}
    />
); 