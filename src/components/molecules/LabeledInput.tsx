import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

interface LabeledInputProps {
    label: string;
    htmlFor?: string;
    type?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
}

export const LabeledInput = ({ label, htmlFor, ...inputProps }: LabeledInputProps) => (
    <div>
        <Label htmlFor={htmlFor}>{label}</Label>
        <Input {...inputProps} />
    </div>
); 