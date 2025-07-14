import React from 'react';
import { Link } from 'react-router-dom';

interface MainTemplateProps {
    children: React.ReactNode;
}

export const MainTemplate = ({ children }: MainTemplateProps) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <nav
            style={{
                width: '100%',
                maxWidth: 672, // ~max-w-2xl
                margin: '0 auto 1.5rem auto',
                padding: '12px 16px',
                borderRadius: 16,
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 16,
            }}
        >
            <Link
                to="/"
                style={{
                    color: '#646cff',
                    fontWeight: 600,
                    padding: '8px 16px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(100,108,255,0.08)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
            >
                Parking Areas Management
            </Link>
            <Link
                to="/payment"
                style={{
                    color: '#646cff',
                    fontWeight: 600,
                    padding: '8px 16px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(100,108,255,0.08)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
            >
                Payment
            </Link>
        </nav>
        <main className="w-full max-w-2xl px-4 mx-auto flex-1 flex flex-col justify-center">{children}</main>
    </div>
); 