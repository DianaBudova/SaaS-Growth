import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import CreateModal from './CreateModal';

export default function Companies(props) {
    const [companies, setCompanies] = useState(props?.companies ?? []);
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/company/create', {
            preserveState: false,
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-medium text-gray-900">Companies</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Here are the companies you belong to
                    </p>
                </div>

                <PrimaryButton onClick={() => setShowModal(true)}>
                    + Create Company
                </PrimaryButton>
            </div>

            {companies.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {companies.map((company) => (
                        <li key={company.id} className="py-3">
                            <div className="text-gray-800 font-medium">{company.name}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-gray-500 text-center py-10 border-2 border-dashed rounded-lg">
                    No companies yet. Click{' '}
                    <Link
                        className="text-indigo-500 font-medium hover:underline"
                        href="#"
                        onClick={() => setShowModal(true)}
                    >
                        here
                    </Link>{' '}
                    to create one.
                </div>
            )}

            {showModal && (
                <CreateModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                />
            )}
        </AuthenticatedLayout>
    );
}
