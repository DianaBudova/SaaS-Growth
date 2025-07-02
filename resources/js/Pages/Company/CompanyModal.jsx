import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function CompanyModal({
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
                <InputLabel value="Company Name" />
                <TextInput
                    type="text"
                    name="name"
                    value={data.name ?? ''}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full"
                    placeholder="Company name"
                    disabled={processing}
                    isFocused
                />
                
                {errors.name && (
                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}

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
