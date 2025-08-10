import React from 'react';

interface LabelProps {
    htmlFor?: string;
    children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-slate-700 mb-2"
        >
            {children}
        </label>
    );
};
