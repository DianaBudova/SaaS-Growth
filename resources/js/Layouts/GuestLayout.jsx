import FlashLayout from "./FlashLayout";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-stone-100 pt-6 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-md">
                <FlashLayout>
                    {children}
                </FlashLayout>
            </div>
        </div>
    );
}
