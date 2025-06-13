import { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

export default function Companies({ companies: initialCompanies = [], flash }) {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        id: '',
        name: '',
    });

    const openCreateModal = (e) => {
        e.preventDefault();

        setData({ id: '', name: '' });
        setCreateModalVisible(true);
    };

    const openEditModal = (company) => {
        setData({ id: company.id, name: company.name });
        setEditModalVisible(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();

        post('/company/create', {
            onSuccess: () => {
                setCreateModalVisible(false);
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        put(`/company/update/${data.id}`, {
            onSuccess: () => {
                setEditModalVisible(false);
            },
        });
    };

    const handleDelete = (e, companyId) => {
        e.preventDefault();

        destroy(`/company/delete/${companyId}`, {});
    };

    return (
        <AuthenticatedLayout>
            <FlashMessage message={flash?.success} />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-medium text-gray-900">Companies</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Here are the companies you belong to
                    </p>
                </div>

                <PrimaryButton disabled={processing} onClick={openCreateModal}>
                    + Create Company
                </PrimaryButton>
            </div>

            {initialCompanies.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {initialCompanies.map((company) => (
                        <li key={company.id} className="flex items-center justify-between py-3">
                            <div className="text-gray-800 font-medium">
                                {company.name}
                            </div>
                            <div className="flex gap-3">
                                <SecondaryButton disabled={processing} onClick={() => openEditModal(company)}>
                                    Edit
                                </SecondaryButton>
                                <DangerButton disabled={processing} onClick={(e) => handleDelete(e, company.id)}>
                                    Remove
                                </DangerButton>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-gray-500 text-center py-10 border-2 border-dashed rounded-lg">
                    No companies yet. Click{' '}
                    <Link
                        className="text-indigo-500 font-medium hover:underline"
                        href="#"
                        onClick={openCreateModal}
                        disabled={processing}
                    >
                        here
                    </Link>{' '}
                    to create one.
                </div>
            )}

            {createModalVisible && (
                <CreateModal
                    show={createModalVisible}
                    onClose={() => setCreateModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreate}
                />
            )}

            {editModalVisible && (
                <EditModal
                    show={editModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleUpdate}
                />
            )}
        </AuthenticatedLayout>
    );
}
