import { useEffect, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectModal from '@/Components/Modals/ProjectModal';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Accordion from '@/Components/Accordion';
import { fetchAPI } from '@/helpers';
import ResourceSidebar from '@/Components/ResourceSidebar';

export default function Company({ company }) {
    // States
    const [projects, setProjects] = useState([]);
    const [members, setMembers]   = useState([]);

    const [createProjectModalVisible, setCreateProjectModalVisible] = useState(false);
    const [editProjectModalVisible, setEditProjectModalVisible]     = useState(false);
    const [inviteMemberModalVisible, setInviteMemberModalVisible]   = useState(false);

    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [isMembersLoading, setIsMembersLoading]   = useState(true);
    const [projectsError, setProjectsError]         = useState(null);
    const [membersError, setMembersError]           = useState(null);



    // Forms
    const initialCompanyFormState = {
        id: company.id,
        name: company.name
    };

    const initialProjectFormState = {
        id: undefined,
        company_id: company.id,
        name: undefined,
        description: undefined,
        start_date: undefined,
        end_date: undefined
    };

    const initialInvitationFormState = {
        company_id: company.id,
        email: undefined,
    };

    const {
        data,
        setData,
        processing,
        errors,
    } = useForm(initialProjectFormState);

    // Form Resets
    const resetCompanyForm    = () => setData(initialCompanyFormState);
    const resetProjectForm    = () => setData(initialProjectFormState);
    const resetInvitationForm = () => setData(initialInvitationFormState);



    // Fetch
    const fetchProjects = async () => {
        fetchAPI(`/v1/companies/${company.id}/projects`)
            .then((response => {
                setProjects(response.result);
            }))
            .catch((err) => setProjectsError(err.response?.message ?? err.message))
            .finally(() => setIsProjectsLoading(false));
    };

    const fetchMembers = async () => {
        fetchAPI(`/v1/companies/${company.id}/members`)
            .then((response => {
                setMembers(response.result);
            }))
            .catch((err) => setMembersError(err.response?.message ?? err.message))
            .finally(() => setIsMembersLoading(false));
    };



    // Effects
    useEffect(() => {
        fetchProjects();
        fetchMembers();
    }, [company.id]);



    // Functions

    // Create
    const openCreateProjectModal = (e) => {
        e.preventDefault();

        resetProjectForm();

        setCreateProjectModalVisible(true);
    };

    const handleCreateProject = (e) => {
        e.preventDefault();

        router.post('/project', data, {
            onSuccess: () => {
                fetchProjects();
                setCreateProjectModalVisible(false);
                resetProjectForm();
            },
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };



    // Edit
    const openEditProjectModal = (project) => {
        setData({ id: project.id, company_id: company.id, name: project.name, description: project.description, start_date: project.start_date, end_date: project.end_date });
        setEditProjectModalVisible(true);
    };

    const handleUpdateProject = (e) => {
        e.preventDefault();

        router.put(`/project/${data.id}`, data, {
            onSuccess: () => {
                fetchProjects();
                setEditProjectModalVisible(false);
                resetProjectForm();
            },
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };



    // Show
    const handleShowProject = (e, projectId) => {
        e.preventDefault();

        resetProjectForm();

        router.visit(`/project/${projectId}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };



    // Delete
    const handleDeleteProject = (e, projectId) => {
        e.preventDefault();

        router.delete(`/project/${projectId}`, {
            onSuccess: () => {
                fetchProjects();
                resetProjectForm();
            },
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };



    // Exclude Member
    const handleExcludeMember = (e, memberId) => {
        e.preventDefault();

        router.delete(`/company/${company.id}/members/${memberId}`, {
            onSuccess: () => {
                fetchMembers();
            },
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };



    return (
        <AuthenticatedLayout>
            <div className="flex flex-col lg:flex-row h-full">
                <ResourceSidebar
                    title={company.name}
                    meta={[
                        { label: 'Company ID', value: company.id },
                        { label: 'Owner ID',   value: company.owner_id },
                        { label: 'Created',    value: new Date(company.created_at).toLocaleDateString() },
                        { label: 'Updated',    value: new Date(company.updated_at).toLocaleDateString() },
                    ]}
                />

                <main className="flex-1 bg-white border-l rounded">
                    <Accordion>
                        <Accordion.Item defaultOpen>
                            <Accordion.Item.Header>
                                <span className="text-xl font-semibold">Projects</span>
                                <p className="mt-1 text-sm text-stone-600">
                                    View and manage your company's projects.
                                </p>
                            </Accordion.Item.Header>

                            <Accordion.Item.Content>
                                <div className="flex items-center justify-end mb-4">
                                    <PrimaryButton
                                        onClick={openCreateProjectModal}
                                        disabled={processing}
                                    >
                                        + Create Project
                                    </PrimaryButton>
                                </div>

                                {isProjectsLoading ? (
                                    <div className="flex flex-col justify-center items-center space-y-2 py-10">
                                        <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
                                        <span className="text-stone-600">Loading projects...</span>
                                    </div>
                                ) : projectsError ? (
                                    <div className="text-red-500 text-center py-10">
                                        {projectsError}
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
                                                <Table.Row>
                                                    <button
                                                        type="button"
                                                        className="text-indigo-500 font-bold hover:underline"
                                                        onClick={(e) => handleShowProject(e, project.id)}
                                                        disabled={processing}
                                                    >
                                                        {project.name ?? '--'}
                                                    </button>
                                                </Table.Row>

                                                <Table.Row>
                                                    {project.description ?? '--'}
                                                </Table.Row>

                                                <Table.Row>
                                                    {project.start_date ?? '--'}
                                                </Table.Row>

                                                <Table.Row>
                                                    {project.end_date ?? '--'}
                                                </Table.Row>

                                                <Table.Row>
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
                                                </Table.Row>
                                            </tr>
                                        )}
                                    />
                                ) : (
                                    <div className="text-stone-600 text-center py-10 border-2 border-dashed rounded-lg">
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
                            </Accordion.Item.Content>
                        </Accordion.Item>

                        <Accordion.Item defaultOpen>
                            <Accordion.Item.Header>
                                <span className="text-xl font-semibold">Members</span>
                                <p className="mt-1 text-sm text-stone-600">
                                    View and manage your company's members.
                                </p>
                            </Accordion.Item.Header>

                            <Accordion.Item.Content>
                                <div className="flex items-center justify-end mb-4">
                                    <PrimaryButton
                                        onClick={openCreateProjectModal}
                                        disabled={processing}
                                    >
                                        + Invite Member
                                    </PrimaryButton>
                                </div>

                                {isMembersLoading ? (
                                    <div className="flex flex-col justify-center items-center space-y-2 py-10">
                                        <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
                                        <span className="text-stone-600">Loading members...</span>
                                    </div>
                                ) : membersError ? (
                                    <div className="text-red-500 text-center py-10">
                                        {membersError}
                                    </div>
                                ) : members.length > 0 ? (
                                    <Table
                                        columns={[
                                            { key: 'name', label: 'Member Name' },
                                            { key: 'role', label: 'Member Role' },
                                            { key: 'email', label: 'Member Email' },
                                            { key: 'actions', label: 'Actions', align: 'right' },
                                        ]}
                                        data={members}
                                        renderRow={(member) => (
                                            <tr key={member.id}>
                                                <Table.Row>
                                                    <button
                                                        type="button"
                                                        className="text-indigo-500 font-bold hover:underline"
                                                        onClick={(e) => handleShowMember(e, member.id)}
                                                        disabled={processing}
                                                    >
                                                        {member.name ?? '--'}
                                                    </button>
                                                </Table.Row>

                                                <Table.Row>
                                                    {member.pivot?.role?.name ?? '--'}
                                                </Table.Row>

                                                <Table.Row>
                                                    {member.email ?? '--'}
                                                </Table.Row>

                                                <Table.Row>
                                                    <div className="flex justify-end gap-3">
                                                        <DangerButton
                                                            className="!p-2.5"
                                                            disabled={processing}
                                                            onClick={(e) => handleExcludeMember(e, member.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                                                <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                                                            </svg>
                                                        </DangerButton>
                                                    </div>
                                                </Table.Row>
                                            </tr>
                                        )}
                                    />
                                ) : (
                                    <div className="text-stone-600 text-center py-10 border-2 border-dashed rounded-lg">
                                        No members in this company yet. Click{' '}
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
                            </Accordion.Item.Content>
                        </Accordion.Item>
                    </Accordion>
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
                    strictCompany
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
                    strictCompany
                />
            )}
        </AuthenticatedLayout>
    );
}
