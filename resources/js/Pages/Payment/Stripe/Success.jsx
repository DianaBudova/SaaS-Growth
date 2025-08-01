import FlashLayout from "@/Layouts/FlashLayout";
import { router } from "@inertiajs/react";
import { CheckCircle } from "lucide-react";

export default function Success() {
    const goToDashboard = () => {
        router.visit('/dashboard');
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[450px] w-[850px] rounded-full bg-indigo-300 opacity-20 blur-[100px]"></div>
            <section className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
                <FlashLayout>
                    <CheckCircle className="mb-6 h-20 w-20 text-emerald-500" strokeWidth={1.5} />
                    <h1 className="mb-4 text-4xl font-bold text-emerald-600">Payment Successful!</h1>
                    <p className="mb-8 text-lg text-gray-600">
                        Thank you for your purchase. Your account has been updated and you now have full access to new features.
                    </p>
                    <button
                        onClick={goToDashboard}
                        className="rounded-xl bg-emerald-600 px-6 py-3 text-white shadow-md transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                        Go to Dashboard
                    </button>
                </FlashLayout>
            </section>
        </div>
    );
}
