import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children: React.ReactNode;
}

export const Button = ({ type = 'button', onClick, disabled, children }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
