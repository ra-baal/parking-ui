import React from 'react';

interface FormRowProps {
    children: React.ReactNode;
}

export const FormRow = ({ children }: FormRowProps) => <div style={{ marginBottom: 16 }}>{children}</div>; 