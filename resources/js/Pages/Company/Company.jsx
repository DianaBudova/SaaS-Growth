import { useEffect, useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import CreateProjectModal from '@/Pages/Project/CreateModal';

export default function Company({ company, flash }) {
    // States
    const [createProjectModalVisible, setCreateProjectModalVisible] = useState(false);

    const [projects, setProjects] = useState([]);

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
    const openCreateProjectModal = (e) => {
        e.preventDefault();

        setData({ id: undefined, company_id: company.id, name: undefined, description: undefined, start_date: undefined, end_date: undefined });
        setCreateProjectModalVisible(true);
    };

    const handleCreateProject = (e) => {
        e.preventDefault();

        post('/project/create', {
            onSuccess: () => {
                setCreateProjectModalVisible(false);
            },
            onFinish: () => {
                setData({ id: undefined, company_id: company.id, name: undefined, description: undefined, start_date: undefined, end_date: undefined });
            },
        });
    };



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

                <div className="col-span-4 border-l">
                    <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                        Projects
                    </h1>

                    <hr className="mb-4"></hr>

                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center space-y-2">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
                            <span className="text-gray-600">Loading projects...</span>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center py-10">
                            ⚠️ {error}
                        </div>
                    ) : projects.length > 0 ? (
                        <ul className="space-y-2">
                            {projects.map((project) => (
                                <li key={project.id} className="border rounded px-4 py-2 shadow">
                                    <h3 className="font-semibold">{project.name}</h3>
                                    <p className="text-sm text-gray-600">ID: {project.id}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-gray-500 text-center py-10">
                            No projects in this company yet. Click{' '}
                            <Link
                                className="text-indigo-500 font-medium hover:underline"
                                href="#"
                                onClick={openCreateProjectModal}
                            >
                                here
                            </Link>{' '}
                            to create one.
                        </div>
                    )}
                </div>
            </div>

            {createProjectModalVisible && (
                <CreateProjectModal
                    show={createProjectModalVisible}
                    onClose={() => setCreateProjectModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreateProject}
                />
            )}
        </AuthenticatedLayout>
    );
}
