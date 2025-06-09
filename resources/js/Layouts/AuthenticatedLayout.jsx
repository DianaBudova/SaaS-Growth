import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-2xl font-bold">SaaS</h1>
                </div>
                <nav className="mt-4 flex flex-col">
                    <Link href="/dashboard" className="px-6 py-3 text-gray-700 hover:bg-gray-200">Dashboard</Link>
                    <Link href="/projects" className="px-6 py-3 text-gray-700 hover:bg-gray-200">Projects</Link>
                    <Link href="/profile" className="px-6 py-3 text-gray-700 hover:bg-gray-200">Profile</Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="text-left px-6 py-3 text-gray-700 hover:bg-gray-200"
                    >
                        <span className="text-red-500">Log Out</span>
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 p-8">
                {children}
            </div>
        </div>
    );
}
