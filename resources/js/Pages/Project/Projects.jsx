import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Table from '@/Components/Table';
import ProjectModal from './NonassociatedProjectModal';

export default function Projects({ projects: initialProjects = [], flash }) {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    // Form
    const initialFormState = {
        id: undefined,
        company_id: undefined,
        name: undefined,
        description: undefined,
        start_date: undefined,
        end_date: undefined
    };

    const {
        data,
        setData,
        get,
        post,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm(initialFormState);

    const resetForm = () => setData(initialFormState);



    const openCreateModal = (e) => {
        e.preventDefault();

        resetForm();

        setCreateModalVisible(true);
    };

    const openEditModal = (project) => {
        setData({ id: project.id, name: project.name });
        setEditModalVisible(true);
    };

    const handleShow = (e, projectId) => {
        e.preventDefault();

        resetForm();

        get(`/project/show/${projectId}`, {});
    };

    const handleCreate = (e) => {
        e.preventDefault();

        post('/project/create', {
            onSuccess: () => {
                get(window.location.pathname);
                setCreateModalVisible(false);
            },
            onFinish: () => {
                resetForm();
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        put(`/project/update/${data.id}`, {
            onSuccess: () => {
                get(window.location.pathname);
                setEditModalVisible(false);
            },
            onFinish: () => {
                resetForm();
            },
        });
    };

    const handleDelete = (e, projectId) => {
        e.preventDefault();

        destroy(`/project/delete/${projectId}`, {
            onSuccess: () => {
                get(window.location.pathname);
            },
            onFinish: () => {
                resetForm();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <FlashMessage message={flash?.success} />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-medium text-gray-900">Projects</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Here are the projects you belong to.
                    </p>
                </div>

                <PrimaryButton disabled={processing} onClick={openCreateModal}>
                    + Create Project
                </PrimaryButton>
            </div>

            {initialProjects.length > 0 ? (
                <Table
                    columns={[
                        { key: 'name', label: 'Project Name' },
                        { key: 'name', label: 'Project Description' },
                        { key: 'name', label: 'Start Date' },
                        { key: 'name', label: 'End Date' },
                        { key: 'actions', label: 'Actions', align: 'right' },
                    ]}
                    data={initialProjects}
                    renderRow={(project) => (
                        <tr key={project.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                <button
                                    type="button"
                                    className="text-indigo-500 font-bold hover:underline"
                                    onClick={(e) => handleShow(e, project.id)}
                                    disabled={processing}
                                >
                                    {project.name}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                <div className="flex justify-end gap-3">
                                    <SecondaryButton
                                        disabled={processing}
                                        onClick={() => openEditModal(project)}
                                    >
                                        Edit
                                    </SecondaryButton>
                                    <DangerButton
                                        className="!p-2.5"
                                        disabled={processing}
                                        onClick={(e) => handleDelete(e, project.id)}
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
                    No projects yet. Click{' '}
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
                <ProjectModal
                    show={createModalVisible}
                    onClose={() => setCreateModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreate}
                    title="Create Project"
                    submitAction="Create"
                />
            )}

            {editModalVisible && (
                <ProjectModal
                    show={editModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleUpdate}
                    title="Update Project"
                    submitAction="Update"
                />
            )}
        </AuthenticatedLayout>
    );
}
