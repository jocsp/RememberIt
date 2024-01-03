import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("App context should be use inside App Context Provider.");
  }

  return appContext;
};

export default useAppContext;
