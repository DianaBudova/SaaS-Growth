export default function HeaderItem({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center h-12 w-12 rounded-lg hover:bg-stone-600 transition-colors duration-150"
        >
            {children}
        </button>
    );
}
