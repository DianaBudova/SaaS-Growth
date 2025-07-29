import FlashLayout from "@/Layouts/FlashLayout";
import { router } from "@inertiajs/react";
import { XCircle } from "lucide-react";

export default function Failed() {
    const goToDashboard = () => {
        router.visit('/dashboard');
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[450px] w-[850px] rounded-full bg-red-300 opacity-20 blur-[100px]"></div>
            <section className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
                <FlashLayout>
                    <XCircle className="mb-6 h-20 w-20 text-red-500" strokeWidth={1.5} />
                    <h1 className="mb-4 text-4xl font-bold text-red-600">Payment Failed</h1>
                    <p className="mb-8 text-lg text-gray-600">
                        Unfortunately, something went wrong with your payment. Please contact us example@growth.com.
                    </p>
                    <button
                        onClick={goToDashboard}
                        className="rounded-xl bg-red-600 px-6 py-3 text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Return to Dashboard
                    </button>
                </FlashLayout>
            </section>
        </div>
    );
}
