import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        console.error(
            "Error! Cannot use AuthContext outside AuthContextProvider.",
        );
        throw new Error("Cannot use Auth Context outside AuthContextProvider.");
    }
    return context;
};

export default useAuthContext;
