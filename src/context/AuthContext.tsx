import { createContext, useReducer, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {auth, db} from "../firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";
import { User, List } from "../types";

enum ACTIONS {
  LOGIN,
  LOGOUT,
  ADDLIST
}

interface ContextType {
  user: User | null;
  authInitializing: Boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  addList: (list: List) => void;
}

type ActionType =
  | { type: ACTIONS.LOGIN; user: User }
  | { type: ACTIONS.LOGOUT }
  | { type: ACTIONS.ADDLIST; list: List};

type ReducerState = User | null;

export const AuthContext = createContext<ContextType | null>(null);

const authReducer = (user: ReducerState, action: ActionType): ReducerState => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return action.user;
    case ACTIONS.LOGOUT:
      return null;
    case ACTIONS.ADDLIST:
    // check if user exists  
    if (!user) {
        console.error("There is no user to add lists to");
        return user
      }
      // returns user with added list
      return {...user, lists: [...user.lists, action.list]}
    default:
      console.error("Auth type does not exist in authReducer");
      return user;
  }
};

interface Props {
  children: JSX.Element;
}
const AuthContextProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(authReducer, null);
  // variable to know if the auth process had finalized
  // true means initializing, false that is still pending
  const [authInitializing, setAuthInitializing] = useState(true)

  useEffect(() => {
    // onAuthStateChanged returns a function that removes the listener
    const removeListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // retrieving user info to dispatch later
        const userSnap = await getDoc(doc(db, "users", user.uid))
        const userData = userSnap.data()

        // retrieving user's lists
        const listsRef = collection(db, "users", user.uid, "lists");
        const listsSnap = await getDocs(listsRef);

        // creating lists array
        const lists: List[] = []
        listsSnap.forEach(list => {
          const listData = list.data()
          lists.push({uid: list.id, name: listData.name, nameSlug: listData.nameSlug})
        })

        // dispatching user info to auth context user with custom data | not the data given by Firebase
        loginUser({
          uid: user.uid,
          name: userData?.displayName ?? "",
          email: userData?.email ?? "",
          lists: lists
        })
      } else {
        logoutUser()
      }
      setAuthInitializing(false)
    });

    // cleaning up
    return () => removeListener()
  }, [])

  function loginUser(user: User) {
    dispatch({ type: ACTIONS.LOGIN, user });
  }

  function logoutUser() {
    dispatch({ type: ACTIONS.LOGOUT });
  }

  function addList(list: List) {
    dispatch({type: ACTIONS.ADDLIST, list})
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, addList, authInitializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
