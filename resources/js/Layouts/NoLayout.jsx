import { useState } from 'react';
//import Muda1 from '@/Components/Muda1';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function NoLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 overflow-hidden">

            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow overflow-hidden">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">{header}</div>
                </header>
            )}

            <main className="overflow-hidden">{children}</main>
        </div>
    );
}
