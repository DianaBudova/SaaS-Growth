import FlashLayout from "./FlashLayout";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 -z-10 m-auto h-[450px] w-[850px] rounded-full bg-indigo-300 opacity-20 blur-[100px]"></div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-md">
                <FlashLayout>
                    {children}
                </FlashLayout>
            </div>
        </div>
    );
}
