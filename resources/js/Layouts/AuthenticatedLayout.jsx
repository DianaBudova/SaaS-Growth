import { Inertia } from '@inertiajs/inertia';
import { Settings, LogOut } from "lucide-react";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import HeaderContainer from '@/Components/HeaderContainer';
import HeaderItem from '@/Components/HeaderItem';
import FlashLayout from './FlashLayout';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden bg-stone-100">
            <aside className="w-64 bg-stone-800 flex flex-col">
                <div className="h-16 flex items-center justify-center">
                </div>
                <nav className="mt-4 flex flex-col flex-grow">
                    <ResponsiveNavLink href="/dashboard" className="px-6 py-3">Dashboard</ResponsiveNavLink>
                    <ResponsiveNavLink href="/company" className="px-6 py-3">Companies</ResponsiveNavLink>
                    <ResponsiveNavLink href="/project" className="px-6 py-3">Projects</ResponsiveNavLink>
                    <ResponsiveNavLink href="/plans" className="px-6 py-3">Upgrade Plan</ResponsiveNavLink>
                </nav>
            </aside>

            <div className="flex flex-col h-screen w-screen">
                <HeaderContainer>
                    <HeaderItem
                        onClick={() => Inertia.visit('/profile')}
                    >
                        <Settings className="h-8 w-8" strokeWidth={2} />
                    </HeaderItem>
                    
                    <HeaderItem
                        onClick={() => Inertia.post('/logout')}
                    >
                        <LogOut className="h-8 w-8 text-red-500" strokeWidth={2} />
                    </HeaderItem>
                </HeaderContainer>

                <div className="flex-1 overflow-auto bg-white p-6 shadow">
                    <FlashLayout>
                        {children}
                    </FlashLayout>
                </div>
            </div>
        </div>
    );
}
