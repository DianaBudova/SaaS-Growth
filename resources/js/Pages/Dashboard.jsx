import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <h1>You're logged in!</h1>
        </AuthenticatedLayout>
    );
}
