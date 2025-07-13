import React from 'react';

interface LabelProps {
    htmlFor?: string;
    children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => {
    return <label htmlFor={htmlFor}>{children}</label>;
};
