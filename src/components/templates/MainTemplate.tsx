import React from 'react';
import { Link } from 'react-router-dom';

interface MainTemplateProps {
    children: React.ReactNode;
}

export const MainTemplate = ({ children }: MainTemplateProps) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center">
        <nav className="w-full max-w-2xl mx-auto mb-8 px-6 py-4 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-blue-900/5 border border-white/20 flex flex-wrap justify-center gap-6">
            <Link
                to="/"
                className="text-slate-700 font-medium px-6 py-3 rounded-xl no-underline transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md hover:scale-105 border border-transparent hover:border-blue-200"
            >
                Parking Areas Management
            </Link>
            <Link
                to="/payment"
                className="text-slate-700 font-medium px-6 py-3 rounded-xl no-underline transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md hover:scale-105 border border-transparent hover:border-blue-200"
            >
                Payment
            </Link>
        </nav>
        <main className="w-full max-w-4xl px-6 mx-auto flex-1 flex flex-col justify-center">{children}</main>
    </div>
); 