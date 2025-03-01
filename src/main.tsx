import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback.tsx";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ErrorBoundary>
  </StrictMode>
);
