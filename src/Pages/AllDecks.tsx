import DeckCard from "../components/DeckCard";
import useAppContext from "../hooks/useAppContext";
import { Link } from "react-router-dom";

const AllDecks = () => {
  const {
    state: { decks },
  } = useAppContext();

  return (
    <div className="grid gap-4 grid-cols-6">
      {decks.map((deck): JSX.Element => {
        return (
          <Link key={deck.id} to={`/decks/${deck.id}`}>
            <DeckCard deck={deck} />
          </Link>
        );
      })}
    </div>
  );
};

const loader = () => {
  return "this is a string";
};

export { loader };
export default AllDecks;
