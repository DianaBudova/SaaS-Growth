import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { fetchAPI } from '@/helpers';
import { useEffect, useState } from 'react';

export default function ProjectModal({
    data,
    setData,
    errors,
    processing,
    onClose,
    onSubmit,
    show,
    title,
    submitAction,
    strictCompany = false
}) {
    const [companies, setCompanies] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            fetchAPI(`/v1/companies`)
                .then((response => {
                    setCompanies(response.result);
                }))
                .catch((err) => setError(err.response?.data?.message ?? err.message))
                .finally(() => setIsLoading(false));
        };

        fetchCompanies();
    }, []);

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header title={title} onClose={onClose} />

            <Modal.Content>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <InputLabel value="Project Name" />
                            <TextInput
                                type="text"
                                name="name"
                                value={data.name ?? ''}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full"
                                placeholder="Project name"
                                disabled={processing}
                                isFocused
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                            )}
                        </div>

                        <div>
                            <InputLabel value="Project Description" />
                            <TextInput
                                type="text"
                                name="description"
                                value={data.description ?? ''}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full"
                                placeholder="Project description"
                                disabled={processing}
                            />
                            {errors.description && (
                                <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                            )}
                        </div>

                        <div>
                            <InputLabel value="Start Date" />
                            <TextInput
                                type="date"
                                name="start_date"
                                value={data.start_date ?? ''}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="w-full"
                                disabled={processing}
                            />
                            {errors.start_date && (
                                <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
                            )}
                        </div>

                        <div>
                            <InputLabel value="End Date" />
                            <TextInput
                                type="date"
                                name="end_date"
                                value={data.end_date ?? ''}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="w-full"
                                disabled={processing}
                            />
                            {errors.end_date && (
                                <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
                            )}
                        </div>

                        <div>
                            <InputLabel value="Associated Company" />
                            <Dropdown
                                name="company_id"
                                options={companies}
                                value={data.company_id ?? ''}
                                onChange={(e) => setData('company_id', e.target.value)}
                                className="w-full"
                                placeholder={strictCompany ? "--" : "Select Associated Company"}
                                disabled={processing || strictCompany}
                                loading={isLoading}
                            />
                            {errors.company_id && (
                                <div className="text-red-500 text-sm mt-1">{errors.company_id}</div>
                            )}
                        </div>
                    </div>

                    <Modal.Footer>
                        <SecondaryButton
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            loading={processing}
                        >
                            {submitAction}
                        </PrimaryButton>
                    </Modal.Footer>
                </form>
            </Modal.Content>
        </Modal>
    );
}
