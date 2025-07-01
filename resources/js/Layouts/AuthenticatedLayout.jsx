import { Inertia } from '@inertiajs/inertia';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ContentContainer from '@/Components/ContentContainer';
import HeaderContainer from '@/Components/HeaderContainer';
import HeaderItem from '@/Components/HeaderItem';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <aside className="w-64 bg-gray-800 flex flex-col">
                <div className="h-16 flex items-center justify-center">
                </div>
                <nav className="mt-4 flex flex-col flex-grow">
                    <ResponsiveNavLink href="/dashboard" className="px-6 py-3 text-white">Dashboard</ResponsiveNavLink>
                    <ResponsiveNavLink href="/company" className="px-6 py-3 text-white">Companies</ResponsiveNavLink>
                    <ResponsiveNavLink href="/project" className="px-6 py-3 text-white">Projects</ResponsiveNavLink>
                </nav>
            </aside>

            <div className="flex flex-col h-screen w-screen">
                <HeaderContainer>
                    <HeaderItem
                        onClick={() => Inertia.visit('/profile')}
                    >
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z"></path>
                        </svg>
                    </HeaderItem>
                    
                    <HeaderItem
                        onClick={() => Inertia.post('/logout')}
                    >
                        <svg className="w-6 h-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"></path>
                        </svg>
                    </HeaderItem>
                </HeaderContainer>

                <ContentContainer>
                    {children}
                </ContentContainer>
            </div>
        </div>
    );
}
