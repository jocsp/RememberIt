import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import { StrictMode } from "react";
import "./index.css";
import Fallback from "./components/Fallback";
import AuthProvider from "./providers/AuthProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={Fallback}>
            <AuthProvider>
                <App />
                <ToastContainer position="top-center" />
            </AuthProvider>
        </ErrorBoundary>
    </StrictMode>,
);
