import { useState } from "react";
import Card from "@/Components/Plan/Card";
import Toggle from "@/Components/Toggle";
import FlashLayout from "@/Layouts/FlashLayout";

export default function Plans({ plans }) {
    const [isYearly, setIsYearly] = useState(true);
    const interval = isYearly ? "yearly" : "monthly";
    const filteredPlans = plans.filter((plan) => plan.interval === interval);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

            <section className="relative z-10 mx-auto max-w-3xl p-8">
                <FlashLayout>
                    <h1 className="mb-8 text-center text-4xl font-bold">Plans & Pricing</h1>

                    <div className="mb-8 flex justify-center items-center gap-3">
                        <span
                            className={`text-base transition-colors ${
                                !isYearly ? "text-indigo-500 font-semibold" : "text-stone-400"
                            }`}
                        >
                            Monthly
                        </span>

                        <Toggle checked={isYearly} onChange={setIsYearly} />

                        <span
                            className={`text-base transition-colors ${
                                isYearly ? "text-indigo-500 font-semibold" : "text-stone-400"
                            }`}
                        >
                            Yearly
                        </span>
                    </div>

                    {filteredPlans.map((plan) => (
                        <Card key={plan.interval + plan.name} plan={plan} />
                    ))}
                </FlashLayout>
            </section>
        </div>
    );
}
