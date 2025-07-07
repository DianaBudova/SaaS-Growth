import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import ResourceSidebar from '@/Components/ResourceSidebar';

export default function Project({ project, flash }) {
    // States
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    return (
        <AuthenticatedLayout>
            <FlashMessage message={flash?.success} />

            <div className="flex flex-col lg:flex-row h-full">
                <ResourceSidebar
                    title={project.name}
                    meta={[
                        { label: 'Project ID',  value: project.id },
                        { label: 'Description', value: project.description || '--' },
                        { label: 'Start date',  value: project.start_date ? new Date(project.start_date).toLocaleDateString() : '--' },
                        { label: 'End date',    value: project.end_date ? new Date(project.start_date).toLocaleDateString() : '--' },
                        { label: 'Created',     value: new Date(project.created_at).toLocaleDateString() },
                        { label: 'Updated',     value: new Date(project.updated_at).toLocaleDateString() },
                    ]}
                />

                <main className="flex-1 bg-white border-l rounded pl-5">
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
