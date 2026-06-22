import { FiLoader } from 'react-icons/fi';

export default function LoadingButton({ children, loading, disabled, className = '', ...props }) {
  return (
    <button
      className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <FiLoader className="h-4 w-4 animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
