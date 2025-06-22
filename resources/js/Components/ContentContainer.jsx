export default function ContentContainer({ children }) {
    return (
        <div className="h-full min-h-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white p-6 shadow sm:rounded-md h-full">
                {children}
            </div>
        </div>
    );
}
