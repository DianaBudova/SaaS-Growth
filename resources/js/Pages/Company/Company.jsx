import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import ProjectModal from '@/Pages/Project/ProjectModal';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Company({ company, flash }) {
    // States
    const [projects, setProjects] = useState([]);

    const [createProjectModalVisible, setCreateProjectModalVisible] = useState(false);
    const [editProjectModalVisible, setEditProjectModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    // Form
    const {
        data,
        setData,
        get,
        post,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        id: undefined,
        company_id: company.id,
        name: undefined,
        description: undefined,
        start_date: undefined,
        end_date: undefined
    });



    // Effects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

                const res = await axios.get(`/api/company/${company.id}/projects`, {
                    withCredentials: true,
                    headers: { 'Accept': 'application/json' },
                });

                setProjects(res.data.projects);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);



    // Functions

    // Create
    const openCreateProjectModal = (e) => {
        e.preventDefault();

        setData({ id: undefined, company_id: company.id, name: undefined, description: undefined, start_date: undefined, end_date: undefined });
        setCreateProjectModalVisible(true);
    };

    const handleCreateProject = (e) => {
        e.preventDefault();

        post('/project/create', {
            onSuccess: () => {
                get(window.location.pathname);
                setCreateProjectModalVisible(false);
            },
            onFinish: () => {
                setData({ id: undefined, company_id: company.id, name: undefined, description: undefined, start_date: undefined, end_date: undefined });
            },
        });
    };



    // Edit
    const openEditProjectModal = (project) => {
        setData({ id: project.id, company_id: company.id, name: project.name, description: project.description, start_date: project.start_date, end_date: project.end_date });
        setEditProjectModalVisible(true);
    };

    const handleUpdateProject = (e) => {
        e.preventDefault();

        put(`/project/update/${data.id}`, {
            onSuccess: () => {
                get(window.location.pathname);
                setEditProjectModalVisible(false);
            },
            onFinish: () => {
                setData({ id: undefined, company_id: company.id, name: undefined, description: undefined, start_date: undefined, end_date: undefined });
            },
        });
    };



    // Show
    const handleShowProject = (e, projectId) => {
        e.preventDefault();

        setData({ id: undefined, company_id: company.id, name: undefined, description: undefined, start_date: undefined, end_date: undefined });
        get(`/project/show/${projectId}`, {});
    };



    // Delete
    const handleDeleteProject = (e, projectId) => {
        e.preventDefault();

        destroy(`/project/delete/${projectId}`, {
            onSuccess: () => {
                get(window.location.pathname);
            },
            onFinish: () => {
                setData({ id: undefined, company_id: company.id, name: undefined, description: undefined, start_date: undefined, end_date: undefined });
            },
        });
    };



    return (
        <AuthenticatedLayout>
            <FlashMessage message={flash?.success} />

            <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/4 bg-white rounded">
                    <h1 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h1>
                    <p className="text-sm text-gray-600 mb-4">
                        Company ID:{' '}
                        <span className="font-mono text-blue-600">{company.id}</span>
                    </p>

                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2 text-sm">
                        <p>
                            <span className="font-medium text-gray-700">Owner:</span>{' '}
                            {company.owner_id ?? 'N/A'}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Created:</span>{' '}
                            {new Date(company.created_at).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Updated:</span>{' '}
                            {new Date(company.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                </aside>

                {/* Projects */}
                <main className="flex-1 bg-white border-l rounded pl-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Here are the projects that belong to this company.
                            </p>
                        </div>

                        <PrimaryButton
                            onClick={openCreateProjectModal}
                            disabled={processing}
                        >
                            + Create Project
                        </PrimaryButton>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center space-y-2 py-10">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
                            <span className="text-gray-600">Loading projects...</span>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center py-10">
                            {error}
                        </div>
                    ) : projects.length > 0 ? (
                        <Table
                            columns={[
                                { key: 'name', label: 'Project Name' },
                                { key: 'description', label: 'Project Description' },
                                { key: 'start_date', label: 'Start Date' },
                                { key: 'end_date', label: 'End Date' },
                                { key: 'actions', label: 'Actions', align: 'right' },
                            ]}
                            data={projects}
                            renderRow={(project) => (
                                <tr key={project.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                        <button
                                            type="button"
                                            className="text-indigo-500 font-bold hover:underline"
                                            onClick={(e) => handleShowProject(e, project.id)}
                                            disabled={processing}
                                        >
                                            {project.name ?? '--'}
                                        </button>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                        {project.description ?? '--'}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                        {project.start_date ?? '--'}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                        {project.end_date ?? '--'}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                        <div className="flex justify-end gap-3">
                                            <SecondaryButton
                                                disabled={processing}
                                                onClick={() => openEditProjectModal(project)}
                                            >
                                                Edit
                                            </SecondaryButton>
                                            <DangerButton
                                                className="!p-2.5"
                                                disabled={processing}
                                                onClick={(e) => handleDeleteProject(e, project.id)}
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
                            No projects in this company yet. Click{' '}
                            <button
                                type="button"
                                onClick={openCreateProjectModal}
                                disabled={processing}
                                className="text-indigo-500 font-medium hover:underline"
                            >
                                here
                            </button>{' '}
                            to create one.
                        </div>
                    )}
                </main>
            </div>

            {createProjectModalVisible && (
                <ProjectModal
                    show={createProjectModalVisible}
                    onClose={() => setCreateProjectModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreateProject}
                    title="Create Project"
                    submitAction="Create"
                />
            )}

            {editProjectModalVisible && (
                <ProjectModal
                    show={editProjectModalVisible}
                    onClose={() => setEditProjectModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleUpdateProject}
                    title="Update Project"
                    submitAction="Update"
                />
            )}
        </AuthenticatedLayout>
    );
}
