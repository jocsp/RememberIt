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
    const { decks, isLoading } = useDecks(listName);

    const renderLoadingPlaceholders = () => {
        if (!listName) {
            return <NoLists />;
        }

        // get previously known deck count from local storage
        const deckCount = localStorage.getItem(listName);
        // variable to be used to create the placeholders array
        let placeholdersCount = 0;

        // if deck count is undefined it means that there was no count stored previously
        if (deckCount === null) {
            // because we don't know how many decks there are, we set a default number
            placeholdersCount = 6;
        } else {
            // if the amount of decks was locally stored, then we used that number
            placeholdersCount = Number(deckCount);
        }

        // display exactly the same amount of
        return Array(placeholdersCount)
            .fill("placeholder")
            .map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <LoadingDeckCard key={`placeholder-${i}`} />
            ));
    };

    const renderDecks = () => {
        if (!listName) {
            return <NoLists />;
        }

        // set a the deck count in case there are no decks
        // the decks.store.ts does not store the in lcoal storage the decks count if it is zero
        // now the second time the user loads the list, they will see the correct amound of
        // placeholders for this list: zero
        if (decks.length === 0) {
            localStorage.setItem(listName, "0");
        }

        // display decks when it's done fetching the decks
        return decks.map(
            (deck): JSX.Element => (
                <Link key={deck.id} to={`/decks/${deck.id}`}>
                    <DeckCard deck={deck} />
                </Link>
            ),
        );
    };

    return (
        <>
            <NavBar />
            <div className="main-content">
                <Lists />
                <div className="decks-container">
                    {/* only display the create deck button if we clicked on a list */}
                    {listName ? <CreateDeckButton /> : null}
                    {/* render placeholders or the actual decks based on loading state */}
                    {isLoading ? renderLoadingPlaceholders() : renderDecks()}
                </div>
            </div>
        </>
    );
};

export default Decks;
