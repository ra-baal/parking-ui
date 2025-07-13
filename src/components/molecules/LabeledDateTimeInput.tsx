import React from 'react';
import { Label } from '../atoms/Label';
import { DateTimeInput } from '../atoms/DateTimeInput';

interface LabeledDateTimeInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    required?: boolean;
}

export const LabeledDateTimeInput = ({ label, value, onChange, name, required }: LabeledDateTimeInputProps) => (
    <div>
        <Label htmlFor={name}>{label}</Label>
        <DateTimeInput value={value} onChange={onChange} name={name} required={required} />
    </div>
); 