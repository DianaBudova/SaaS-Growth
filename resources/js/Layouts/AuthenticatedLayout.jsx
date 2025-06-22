import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import DangerResponsiveNavLink from '@/Components/DangerResponsiveNavLink';
import ContentContainer from '@/Components/ContentContainer';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-2xl font-bold">SaaS</h1>
                </div>
                <nav className="mt-4 flex flex-col flex-grow">
                    <ResponsiveNavLink href="/dashboard" className="px-6 py-3 text-gray-700">Dashboard</ResponsiveNavLink>
                    <ResponsiveNavLink href="/company" className="px-6 py-3 text-gray-700">Companies</ResponsiveNavLink>
                    <ResponsiveNavLink href="/project" className="px-6 py-3 text-gray-700">Projects</ResponsiveNavLink>
                    <ResponsiveNavLink href="/profile" className="px-6 py-3 text-gray-700">Profile</ResponsiveNavLink>
                    <DangerResponsiveNavLink
                        href="/logout"
                        method="post"
                        as="button"
                        className="px-6 py-3 mt-auto"
                    >
                        Log Out
                    </DangerResponsiveNavLink>
                </nav>
            </aside>

            <div className="flex-1 overflow-auto">
                <ContentContainer>
                    {children}
                </ContentContainer>
            </div>
        </div>
    );
}
