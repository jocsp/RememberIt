import { FallbackProps } from "react-error-boundary";

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col h-screen justify-center text-center gap-12 ">
      <pre>{error.message}</pre>
      <div className="flex justify-center gap-8">
        <a
          className="px-4 py-2 border rounded-md hover:bg-slate-200 active:bg-slate-400"
          href="/">
          Return Home
        </a>
        <button
          className="px-4 py-2 border text-violet-50 border-violet-500 rounded-md bg-violet-500 hover:bg-violet-600 active:bg-violet-800"
          onClick={resetErrorBoundary}>
          Reload
        </button>
      </div>
    </div>
  );
};

export default Fallback;
