import React from 'react';
import { Label } from '../atoms/Label';
import { Select } from '../atoms/Select';

interface LabeledSelectProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

export const LabeledSelect = ({ label, value, onChange, name, required, disabled, children }: LabeledSelectProps) => (
    <div>
        <Label htmlFor={name}>{label}</Label>
        <Select value={value} onChange={onChange} name={name} required={required} disabled={disabled}>
            {children}
        </Select>
    </div>
); 