import { useState } from "react";
import Card from "@/Components/Plan/Card";
import Toggle from "@/Components/Toggle";
import FlashLayout from "@/Layouts/FlashLayout";

export default function Plans({ plans }) {
    const [isYearly, setIsYearly] = useState(true);

    const interval = isYearly ? "yearly" : "monthly";
    const filteredPlans = plans.filter((plan) => plan.interval === interval);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[450px] w-[850px] rounded-full bg-indigo-300 opacity-20 blur-[100px]"></div>
            <section className="relative z-10 mx-auto max-w-3xl p-8">
                <FlashLayout>
                    <h1 className="mb-8 text-center text-4xl font-bold">Plans & Pricing</h1>

                    <div className="mb-8 flex justify-center items-center gap-3">
                        <span
                            className={`text-base transition-colors ${!isYearly ? "text-indigo-500 font-semibold" : "text-stone-400"
                                }`}
                        >
                            Monthly
                        </span>

                        <Toggle checked={isYearly} onChange={setIsYearly} />

                        <span
                            className={`text-base transition-colors ${isYearly ? "text-indigo-500 font-semibold" : "text-stone-400"
                                }`}
                        >
                            Yearly
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {filteredPlans.map((plan) => (
                            <Card key={plan.interval + plan.name} plan={plan} />
                        ))}
                    </div>
                </FlashLayout>
            </section>
        </div>
    );
}
