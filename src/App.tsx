import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import AllDecks, { loader as fetchDecks } from "./Pages/AllDecks";
import SingleDeck, { loader as singleDeckLoader } from "./Pages/SingleDeck";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllDecks />,
    errorElement: <ErrorPage />,
    loader: fetchDecks,
  },
  { path: "decks/:id", element: <SingleDeck />, loader: singleDeckLoader },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
