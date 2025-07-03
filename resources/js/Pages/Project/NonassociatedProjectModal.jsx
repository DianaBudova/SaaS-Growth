import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function NonassociatedProjectModal({
    data,
    setData,
    errors,
    processing,
    onClose,
    onSubmit,
    show,
    title,
    submitAction
}) {
    return (
        <Modal show={show} onClose={onClose} title={title}>
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
                    </div>

                    <div>
                        <InputLabel value="Start Date" />
                        <TextInput
                            type="date"
                            name="start_date"
                            value={data.start_date ?? ''}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="w-full"
                            placeholder="Start date"
                            disabled={processing}
                        />
                    </div>

                    <div>
                        <InputLabel value="End Date" />
                        <TextInput
                            type="date"
                            name="end_date"
                            value={data.end_date ?? ''}
                            onChange={(e) => setData('end_date', e.target.value)}
                            className="w-full"
                            placeholder="End date"
                            disabled={processing}
                        />
                    </div>

                    <div>
                        <InputLabel value="Associated Company" />
                        <Dropdown
                            value={data.company_id ?? ''}
                            onChange={(e) => setData('company_id', e.target.value)}
                            className="w-full"
                            placeholder="Select Associated Company"
                            disabled={processing}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    <SecondaryButton
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        type="submit"
                        disabled={processing}
                    >
                        {submitAction}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
