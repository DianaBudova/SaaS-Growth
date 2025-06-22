import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function CreateModal({ data, setData, errors, processing, onClose, onSubmit, show }) {
    return (
        <Modal show={show} onClose={onClose} title="Create Project">
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-4">
                    <div>
                        <InputLabel value="Project Name" />
                        <TextInput
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                            placeholder="Project name"
                            disabled={processing}
                            isFocused
                        />
                    </div>

                    <div>
                        <InputLabel value="Project Description" />
                        <TextInput
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                            placeholder="Project description"
                            disabled={processing}
                            isFocused
                        />
                    </div>
                </div>
                
                {errors.name && (
                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}

                {errors.description && (
                    <div className="text-red-500 text-sm mt-1">{errors.description}</div>
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
        </Modal>
    );
}
