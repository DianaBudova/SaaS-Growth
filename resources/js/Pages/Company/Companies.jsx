import { useEffect, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Table from '@/Components/Table';
import CompanyModal from '@/Components/Modals/CompanyModal';
import { fetchAPI } from '@/helpers';

export default function Companies({ companies: initialCompanies = [] }) {
    const [companies, setCompanies] = useState(initialCompanies);

    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    // Form
    const initialFormState = {
        id: undefined,
        name: undefined,
    };

    const {
        data,
        setData,
        processing,
        errors,
    } = useForm(initialFormState);

    const resetForm = () => setData(initialFormState);



    // Effects
    useEffect(() => {
        const fetchCompanies = async () => {
            fetchAPI(`/v1/companies`)
                .then(setCompanies)
                .catch((err) => setError(err.response?.data?.message ?? err.message))
                .finally(() => setIsLoading(false));
        };

        fetchCompanies();
    }, [reload]);



    const openCreateModal = (e) => {
        e.preventDefault();

        resetForm();

        setCreateModalVisible(true);
    };

    const openEditModal = (company) => {
        setData({ id: company.id, name: company.name });
        setEditModalVisible(true);
    };

    const handleShow = (e, companyId) => {
        e.preventDefault();

        resetForm();

        router.visit(`/company/${companyId}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleCreate = (e) => {
        e.preventDefault();

        router.post('/company', data, {
            onSuccess: () => {
                setReload(!reload);
                setCreateModalVisible(false);
                resetForm();
            },
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        router.put(`/company/${data.id}`, data, {
            onSuccess: () => {
                setReload(!reload);
                setEditModalVisible(false);
                resetForm();
            },
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleDelete = (e, companyId) => {
        e.preventDefault();

        router.delete(`/company/${companyId}`, {
            onSuccess: () => {
                setReload(!reload);
                resetForm();
            },
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-medium text-gray-900">Companies</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Here are the companies you belong to.
                    </p>
                </div>

                <PrimaryButton disabled={processing} onClick={openCreateModal}>
                    + Create Company
                </PrimaryButton>
            </div>

            {isLoading ? (
                <div className="flex flex-col justify-center items-center space-y-2 py-10">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading companies...</span>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-10">
                    {error}
                </div>
            ) : companies.length > 0 ? (
                <Table
                    columns={[
                        { key: 'name', label: 'Company Name' },
                        { key: 'actions', label: 'Actions', align: 'right' },
                    ]}
                    data={companies}
                    renderRow={(company) => (
                        <tr key={company.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                <button
                                    type="button"
                                    className="text-indigo-500 font-bold hover:underline"
                                    onClick={(e) => handleShow(e, company.id)}
                                    disabled={processing}
                                >
                                    {company.name}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                <div className="flex justify-end gap-3">
                                    <SecondaryButton
                                        disabled={processing}
                                        onClick={() => openEditModal(company)}
                                    >
                                        Edit
                                    </SecondaryButton>
                                    <DangerButton
                                        className="!p-2.5"
                                        disabled={processing}
                                        onClick={(e) => handleDelete(e, company.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                            <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                                        </svg>
                                    </DangerButton>
                                </div>
                            </td>
                        </tr>
                    )}
                />
            ) : (
                <div className="text-gray-600 text-center py-10 border-2 border-dashed rounded-lg">
                    No companies yet. Click{' '}
                    <button
                        type="button"
                        className="text-indigo-500 font-medium hover:underline"
                        onClick={openCreateModal}
                        disabled={processing}
                    >
                        here
                    </button>{' '}
                    to create one.
                </div>
            )}

            {createModalVisible && (
                <CompanyModal
                    show={createModalVisible}
                    onClose={() => setCreateModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreate}
                    title="Create Company"
                    submitAction="Create"
                />
            )}

            {editModalVisible && (
                <CompanyModal
                    show={editModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleUpdate}
                    title="Update Company"
                    submitAction="Update"
                />
            )}
        </AuthenticatedLayout>
    );
}
