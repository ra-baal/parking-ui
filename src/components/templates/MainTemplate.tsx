import React from 'react';
import { Link } from 'react-router-dom';

interface MainTemplateProps {
    children: React.ReactNode;
}

export const MainTemplate = ({ children }: MainTemplateProps) => (
    <div>
        <nav style={{ padding: 16, borderBottom: '1px solid #eee', marginBottom: 24 }}>
            <Link to="/" style={{ marginRight: 16 }}>Parking Areas Management</Link>
            <Link to="/payment">Payment</Link>
        </nav>
        <main>{children}</main>
    </div>
); 