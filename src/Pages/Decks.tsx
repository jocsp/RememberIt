import { Key } from "react";
import DeckCard from "../components/DeckCard";
import { Link, useParams } from "react-router-dom";
import useDecks from "../hooks/useDecks";
import NavBar from "../components/NavBar";
import Lists from "../components/Lists";
import LoadingDeckCard from "../components/LoadingDeckCard";
import NoLists from "../components/NoLists";

const Decks = () => {
  const { listName } = useParams();
  const { decks, loading } = useDecks(listName);

  const renderDecks = () => {

    if (!listName) {
      return <NoLists />
    }

    // if it is still fetching the decks
    if (loading) {
      return [1, 2, 3, 4, 5].map(key => {
        return <LoadingDeckCard key={key}/>
      })
    }

    // if decks is empty
    if (decks.length == 0) {
      return <p>No decks to display</p>;
    }

    // runs when it's done fetching the decks
    return (
      <>
        {decks.map((deck): JSX.Element => {
          // getting the fields
          return (
            <Link key={deck.id as Key} to={`/decks/${deck.id}`}>
              <DeckCard deck={deck} />
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Lists />
        <div className="decks-container">
          {renderDecks()}
        </div>
      </div>
    </>
  );
};

export default Decks;
