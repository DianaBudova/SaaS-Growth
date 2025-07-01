export default function HeaderItem({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-150"
        >
            {children}
        </button>
    );
}
