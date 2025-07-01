export default function ContentContainer({ children }) {
    return (
        <div className="flex-1 overflow-auto bg-white p-6 shadow">
            {children}
        </div>
    );
}
