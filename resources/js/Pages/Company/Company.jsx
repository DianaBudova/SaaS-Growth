import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';

export default function Company({ company, flash }) {
    return (
        <AuthenticatedLayout>
            <FlashMessage message={flash?.success} />

            <div className="grid grid-cols-5">
                <div className="col-span-1">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        {company.name}
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        Company ID: <span className="font-mono text-blue-600">{company.id}</span>
                    </p>

                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                        <p>
                            <span className="font-medium text-gray-700">Owner:</span>{' '}
                            {company.owner_id ?? 'N/A'}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Created at:</span>{' '}
                            {new Date(company.created_at).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Updated at:</span>{' '}
                            {new Date(company.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="col-span-4 border-l pl-8">
                    <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                        Company Projects
                    </h1>

                    <div className="text-gray-500 text-center py-10 border-2 border-dashed rounded-lg">
                        No projects in this company yet. Click{' '}
                        <Link
                            className="text-indigo-500 font-medium hover:underline"
                            href="#"
                        >
                            here
                        </Link>{' '}
                        to create one.
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
