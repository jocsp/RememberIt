import { Link, useParams } from "react-router-dom";
import DeckCard from "../components/DeckCard";
import useDecks from "../hooks/useDecks";
import NavBar from "../components/NavBar";
import Lists from "../components/Lists";
import LoadingDeckCard from "../components/LoadingDeckCard";
import NoLists from "../components/NoLists";
import CreateDeckButton from "../components/CreateDeckButton";

const Decks = () => {
    const { listName } = useParams();
    const { decks, loading, refetchDecks } = useDecks(listName);

    const renderDecks = () => {
        if (!listName) {
            return <NoLists />;
        }
        // if it is still fetching the decks
        if (loading) {
            return (
                <div className="decks-container">
                    {[1, 2, 3, 4, 5].map((key) => (
                        <LoadingDeckCard key={key} />
                    ))}
                </div>
            );
        }

        // if decks is empty
        if (decks.length === 0) {
            return <p>No decks to display</p>;
        }

        // runs when it's done fetching the decks
        return (
            <div className="decks-container">
                <CreateDeckButton refetchDecks={refetchDecks}/>
                {decks.map(
                    (deck): JSX.Element => (
                        <Link key={deck.id} to={`/decks/${deck.id}`}>
                            <DeckCard deck={deck} />
                        </Link>
                    ),
                )}
            </div>
        );
    };

    return (
        <>
            <NavBar />
            <div className="main-content">
                <Lists />
                {renderDecks()}
            </div>
        </>
    );
};

export default Decks;
