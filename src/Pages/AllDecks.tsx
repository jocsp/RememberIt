import { Key } from "react";
import DeckCard from "../components/DeckCard";
import { Link } from "react-router-dom";
import useDecks from "../hooks/useDecks";
import NavBar from "../components/NavBar";

const AllDecks = () => {
  const { decks, loading } = useDecks();

  const renderDecks = () => {
    if (!loading && decks.length == 0) {
      return <p>No decks to display</p>;
    }

    return decks ? (
      <div className="grid gap-4 grid-cols-6 px-20 py-10">
        {decks.map((deck): JSX.Element => {
          // getting the fields

          return (
            <Link key={deck.id as Key} to={`/decks/${deck.id}`}>
              <DeckCard deck={deck} />
            </Link>
          );
        })}
      </div>
    ) : (
      <p>loading</p>
    );
  };

  return (
    <>
      <NavBar />
      {renderDecks()}
    </>
  );
};

export default AllDecks;
