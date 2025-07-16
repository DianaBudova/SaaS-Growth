import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function InviteModal({
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
        <Modal show={show} onClose={onClose}>
            <Modal.Header title={title} onClose={onClose} />

            <Modal.Content>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <InputLabel value="User Email" />
                            <TextInput
                                type="email"
                                name="email"
                                value={data.email ?? ''}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full"
                                placeholder="User email"
                                disabled={processing}
                                isFocused
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
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
