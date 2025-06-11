import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function CreateModal({ data, setData, errors, processing, onClose, onSubmit, show }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Create Company</h2>

                <form onSubmit={onSubmit}>
                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                        placeholder="Company name"
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
                            Create
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
