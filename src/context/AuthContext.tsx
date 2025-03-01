import { createContext, useReducer } from "react";
import { User } from "firebase/auth";

enum ACTIONS {
  LOGIN,
  LOGOUT,
}

interface ContextType {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

type ActionType =
  | { type: ACTIONS.LOGIN; user: User }
  | { type: ACTIONS.LOGOUT };

type ReducerState = User | null;

export const AuthContext = createContext<ContextType | null>(null);

const authReducer = (user: ReducerState, action: ActionType): ReducerState => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return action.user;
    case ACTIONS.LOGOUT:
      return null;
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

  function loginUser(user: User) {
    dispatch({ type: ACTIONS.LOGIN, user });
  }

  function logoutUser() {
    dispatch({ type: ACTIONS.LOGOUT });
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
