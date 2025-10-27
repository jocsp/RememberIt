import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import logger from "../utils/logger";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        logger.error(
            "Error! Cannot use AuthContext outside AuthContextProvider.",
        );
        throw new Error("Cannot use Auth Context outside AuthContextProvider.");
    }
    return context;
};

export default useAuthContext;
