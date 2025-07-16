import { usePage } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function GuestLayout({ children }) {
    const { flash } = usePage().props;

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-md">
                <FlashMessage type="success" message={flash?.success} />
                <FlashMessage type="info" message={flash?.info} />
                <FlashMessage type="error" message={flash?.error} />

                {children}
            </div>
        </div>
    );
}
