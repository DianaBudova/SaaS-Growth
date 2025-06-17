export default function ContentContainer({ children }) {
    return (
        <div className="py-12">
            <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white p-4 shadow sm:rounded-md sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}