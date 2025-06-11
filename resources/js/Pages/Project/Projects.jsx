import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Projects() {
    return (
        <AuthenticatedLayout>
            <div>
                <PrimaryButton>
                    Create Project
                </PrimaryButton>
            </div>
        </AuthenticatedLayout>
    );
}
