import { useState } from "react";

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex justify-between items-center p-5 text-left font-medium text-gray-800 hover:bg-gray-50 transition ${
                isOpen ? "bg-gray-100" : ""
            }`}
        >
            <span className="text-xl font-semibold">{title}</span>
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

        <div
            className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
            <div className="overflow-hidden">
                <div className="px-5 py-6">
                    {children}
                </div>
            </div>
        </div>
    </div>
  );
}
