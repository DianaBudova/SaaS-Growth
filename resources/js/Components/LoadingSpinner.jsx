export default function LoadingSpinner({ className = '' }) {
    return (
        <div className={`w-6 h-6 border-2 border-brand-primaryLight border-dashed rounded-full animate-spin ${className}`}></div>
    );
}