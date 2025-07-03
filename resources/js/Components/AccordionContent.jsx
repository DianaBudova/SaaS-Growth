export default function AccordionContent({ children }) {
    return (
        <div className="overflow-hidden">
            <div className="px-5 py-4">
                {children}
            </div>
        </div>
    );
}
