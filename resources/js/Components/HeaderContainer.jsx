export default function HeaderContainer({ children }) {
    return (
        <div className="flex items-center justify-end gap-3 h-16 pr-5 bg-gray-800 border-b border-gray-600">
            {children}
        </div>
    );
}
