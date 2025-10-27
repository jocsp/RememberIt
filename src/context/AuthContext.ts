import { createContext } from "react";
import { User, List } from "../types";

interface ContextType {
    user: User | null;
    authInitializing: boolean;
    loginUser: (user: User) => void;
    logoutUser: () => void;
    addList: (list: List) => void;
}

const AuthContext = createContext<ContextType | null>(null);

export default AuthContext;
