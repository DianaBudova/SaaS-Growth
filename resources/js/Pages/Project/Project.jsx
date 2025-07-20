import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ResourceSidebar from '@/Components/ResourceSidebar';
import Accordion from '@/Components/Accordion';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import DangerButton from '@/Components/DangerButton';
import { router, useForm } from '@inertiajs/react';
import { fetchAPI } from '@/helpers';
import InviteModal from '@/Components/Modals/InviteModal';

export default function Project({ project }) {
    // States
    const [members, setMembers] = useState([]);

    const [inviteModalVisible, setInviteModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    // Forms
    const initialInvitationFormState = {
        project_id: project.id,
        email: '',
    };

    const {
        data,
        setData,
        processing,
        errors,
    } = useForm(initialInvitationFormState);
    
    // Form Resets
    const resetInvitationForm = () => setData(initialInvitationFormState);



    // Fetch
    const fetchMembers = async () => {
        fetchAPI(`/v1/projects/${project.id}/members`)
            .then(setMembers)
            .catch((err) => setError(err.response?.message ?? err.message))
            .finally(() => setIsLoading(false));
    };



    // Effects
    useEffect(() => {
        fetchMembers();
    }, [project.id]);



    // Functions

    // Invite
    const openInviteMemberModal = (e) => {
        e.preventDefault();

        resetInvitationForm();

        setInviteModalVisible(true);
    };

    const handleInviteMember = (e) => {
        e.preventDefault();

        router.post('/project/invite', data, {
            onSuccess: () => {
                setInviteModalVisible(false);
                resetInvitationForm();
            },
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };



    // Show
    const handleShowMember = (e, memberId) => {
        e.preventDefault();

        resetInvitationForm();

        router.visit(`/user/${memberId}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };



    // Exclude Member
    const handleExcludeMember = (e, memberId) => {
        e.preventDefault();

        router.delete(`/project/${project.id}/members/${memberId}`, {
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

                <main className="flex-1 bg-white border-l rounded">
                    <Accordion>
                        <Accordion.Item defaultOpen>
                            <Accordion.Item.Header>
                                <span className="text-xl font-semibold">Members</span>
                                <p className="mt-1 text-sm text-gray-600">
                                    View and manage your project's members.
                                </p>
                            </Accordion.Item.Header>

                            <Accordion.Item.Content>
                                <div className="flex items-center justify-end mb-4">
                                    <PrimaryButton
                                        onClick={openInviteMemberModal}
                                        disabled={processing}
                                    >
                                        + Invite Member
                                    </PrimaryButton>
                                </div>

                                {isLoading ? (
                                    <div className="flex flex-col justify-center items-center space-y-2 py-10">
                                        <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
                                        <span className="text-gray-600">Loading members...</span>
                                    </div>
                                ) : error ? (
                                    <div className="text-red-500 text-center py-10">
                                        {error}
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
                                    <div className="text-gray-600 text-center py-10 border-2 border-dashed rounded-lg">
                                        No members in this project yet. Click{' '}
                                        <button
                                            type="button"
                                            onClick={openInviteMemberModal}
                                            disabled={processing}
                                            className="text-indigo-500 font-medium hover:underline"
                                        >
                                            here
                                        </button>{' '}
                                        to invite one.
                                    </div>
                                )}
                            </Accordion.Item.Content>
                        </Accordion.Item>
                    </Accordion>
                </main>
            </div>

            {inviteModalVisible && (
                <InviteModal
                    show={inviteModalVisible}
                    onClose={() => setInviteModalVisible(false)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleInviteMember}
                    title="Invite Member"
                    submitAction="Send Invitation"
                />
            )}
        </AuthenticatedLayout>
    );
}
