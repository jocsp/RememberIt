import { useReducer, useEffect, useState, useMemo, useCallback } from "react";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { User, List } from "../types";
import logger from "../utils/logger";
import AuthContext from "../context/AuthContext";

enum ACTIONS {
    LOGIN,
    LOGOUT,
    ADDLIST,
}

type ActionType =
    | { type: ACTIONS.LOGIN; user: User }
    | { type: ACTIONS.LOGOUT }
    | { type: ACTIONS.ADDLIST; list: List };

type ReducerState = User | null;

const authReducer = (user: ReducerState, action: ActionType): ReducerState => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return action.user;
        case ACTIONS.LOGOUT:
            return null;
        case ACTIONS.ADDLIST:
            // check if user exists
            if (!user) {
                logger.error("There is no user to add lists to");
                return user;
            }
            // returns user with added list
            return { ...user, lists: [action.list, ...user.lists] };
        default:
            logger.error("Auth type does not exist in authReducer");
            return user;
    }
};

interface Props {
    children: React.ReactNode;
}
const AuthProvider = ({ children }: Props) => {
    const [user, dispatch] = useReducer(authReducer, null);
    // variable to know if the auth process had finalized
    // true means initializing, false that is still pending
    const [authInitializing, setAuthInitializing] = useState(true);

    const loginUser = useCallback((newUser: User) => {
        dispatch({ type: ACTIONS.LOGIN, user: newUser });
    }, []);

    const logoutUser = useCallback(() => {
        dispatch({ type: ACTIONS.LOGOUT });
    }, []);

    const addList = useCallback((list: List) => {
        dispatch({ type: ACTIONS.ADDLIST, list });
    }, []);

    useEffect(() => {
        // onAuthStateChanged returns a function that removes the listener
        const removeListener = onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
                // retrieving user info to dispatch later
                const userSnap = await getDoc(doc(db, "users", fbUser.uid));
                const userData = userSnap.data();

                // retrieving user's lists
                const listsRef = collection(db, "users", fbUser.uid, "lists");
                const q = query(listsRef, orderBy("createdAt", "desc")); // query orders the lists by the date of creation
                const listsSnap = await getDocs(q);

                // creating lists array
                const lists: List[] = [];
                listsSnap.forEach((list) => {
                    const listData = list.data();
                    lists.push({
                        id: list.id,
                        name: listData.name,
                        createdAt: listData.createdAt.toDate(),
                    });
                });

                // dispatching user info to auth context user with custom data | not the data given by Firebase
                loginUser({
                    id: fbUser.uid,
                    name: userData?.displayName ?? "",
                    email: userData?.email ?? "",
                    lists,
                });
            } else {
                logoutUser();
            }
            setAuthInitializing(false);
        });

        // cleaning up
        return () => removeListener();
    }, [loginUser, logoutUser]);

    const value = useMemo(
        () => ({ user, loginUser, logoutUser, addList, authInitializing }),
        [user, loginUser, logoutUser, addList, authInitializing],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
