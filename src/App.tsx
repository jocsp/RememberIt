import "./index.css";
import "./Pages/auth.css"; // TODO: Change everything from auth.css to a different file and delete this import
import "./styles/components.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import AllDecks from "./Pages/AllDecks";
// import SingleDeck, { loader as singleDeckLoader } from "./Pages/SingleDeck";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import useAuthContext from "./hooks/useAuthContext";
import Testing from "./Pages/Testing";

function App() {
  // useAuthContext
  const { user, loginUser, logoutUser } = useAuthContext();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginUser(user);
    } else {
      logoutUser();
    }
  });

  const router = createBrowserRouter([
    {
      path: "/testing",
      element: <Testing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: !user ? <Login /> : <Navigate to="/decks" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: !user ? <SignUp /> : <Navigate to="/decks" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/decks",
      element: user ? <AllDecks /> : <Navigate to="/login" />,
      errorElement: <ErrorPage />,
    },
    // { path: "decks/:id", element: <SingleDeck />, loader: singleDeckLoader },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
