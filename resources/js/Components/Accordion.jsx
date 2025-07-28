import { useState } from "react";

export default function Accordion({ children }) {
    return (
        <div className="flex flex-col divide-y divide-brand-border rounded overflow-hidden">
            {children}
        </div>
    );
}

Accordion.Item = function AccordionItem({ children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    const childrenArray = Array.isArray(children) ? children : [children];

    const header = childrenArray.find((child) => child?.type === Accordion.Item.Header);
    const content = childrenArray.find((child) => child?.type === Accordion.Item.Content);

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex justify-between items-center px-5 py-4 text-left font-medium text-stone-800 hover:bg-brand-border transition ${isOpen ? "bg-brand-border/40" : ""}`}
            >
                {header}

                <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                {content}
            </div>
        </div>
    );
};

Accordion.Item.Header = function AccordionItemHeader({ children }) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    );
};

Accordion.Item.Content = function AccordionItemContent({ children }) {
    return (
        <div className="overflow-hidden">
            <div className="px-5 py-4 bg-brand-bg text-stone-800">
                {children}
            </div>
        </div>
    );
};