export default function HeaderItem({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center h-12 w-12 rounded-lg text-stone-200 hover:text-stone-800 hover:bg-stone-200 transition-colors duration-150 "
        >
            {children}
        </button>
    );
}
