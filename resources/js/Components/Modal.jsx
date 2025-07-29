import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => { },
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-12 transition-all sm:px-0"
                onClose={close}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-stone-500/75" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`mb-6 transform overflow-hidden rounded-md shadow-md transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
                    >
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}

Modal.Header = function ModalHeader({ title, onClose, closeable = true }) {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-700 to-blue-900">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {closeable && (
                <button
                    onClick={onClose}
                    className="text-stone-400 hover:text-stone-600 transition"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white hover:text-stone-300 transition"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.68342 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.31658 4.90237 17.68342 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

Modal.Content = function ModalContent({ children }) {
    return <div className="bg-white p-6">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
    return (
        <div className="mt-6 py-3 flex justify-end gap-2 border-t">
            {children}
        </div>
    );
};
