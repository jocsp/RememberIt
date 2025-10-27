import "./index.css";
import "./styles/components.css";
import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Decks from "./Pages/Decks";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import useAuthContext from "./hooks/useAuthContext";

const App = () => {
    // useAuthContext
    const { user } = useAuthContext();

    const router = createBrowserRouter([
        {
            // same as when user clicks on a list but it does not show any decks
            path: "/",
            element: <Decks />,
            errorElement: <ErrorPage />,
        },

        {
            // path when the user clicks on a list
            path: "/:listName",
            element: <Decks />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/login",
            element: !user ? <Login /> : <Navigate to="/" />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/signup",
            element: !user ? <SignUp /> : <Navigate to="/" />,
            errorElement: <ErrorPage />,
        },

        // { path: "decks/:id", element: <SingleDeck />, loader: singleDeckLoader },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
