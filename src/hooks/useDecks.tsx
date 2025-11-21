import { useEffect, useState, Key } from "react";
import {
    getDocs,
    where,
    query,
    collection,
    doc,
    getDoc,
    orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { db } from "../firebaseConfig";
import { Deck } from "../types";
import useAuthContext from "./useAuthContext";
import logger from "../utils/logger";
import useDecksStore from "../stores/decks.store";

// useDecks will receive the name of the list so it can retrieve the decks of that list
const useDecks = (listName: string | undefined) => {
    const { user, authInitializing } = useAuthContext();
    const userId = user?.id;
    const { decks, setDecks } = useDecksStore(
        // useShallow prevents returning a new object everytime, therefore, prevents re renders
        useShallow((state) => ({
            decks: state.decks,
            setDecks: state.setDecks,
        })),
    );
    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadedListName, setLoadedListName] = useState<string | undefined>(
        undefined,
    );
    // loading is set to false when the user clicks a on a new list, therefore this is a better way to
    // detect if the decks are loading or not
    const isLoading = loading || loadedListName !== listName;
    const navigate = useNavigate();

    const refetchDecks = () => {
        setRefetch((prev) => !prev);
    };

    useEffect(() => {
        const fetchDecks = async () => {
            if (!listName) {
                setLoading(false);
                setDecks([]);
                setLoadedListName(undefined);
                // no need to return anything
                // decks page would show a message to the user to select a list
                return;
            }

            // only fetches the decks if the auth process had finalized
            if (authInitializing) return;

            if (!userId) {
                setDecks([]);
                setLoading(false);
                setLoadedListName(undefined);
                return;
            }
            try {
                // checking if the user has a list with indicated listName || listName is already slugify
                const listRef = doc(db, "users", userId, "lists", listName);

                const listSnap = await getDoc(listRef);

                if (!listSnap.exists()) {
                    throw new Error(`The list ${listName} does not exist.`, {
                        cause: "no-list-found",
                    });
                }

                // querying docs that belong to the user (userId) and belong to the specific list (listName) | listName is already slugify
                const q = query(
                    collection(db, "decks"),
                    where("userId", "==", userId),
                    where("listId", "==", listName),
                    orderBy("createdAt", "desc"),
                );

                const decksSnapshot = await getDocs(q);

                const docs = decksSnapshot.docs.map((document): Deck => {
                    const docData = document.data();
                    // transforming the doc snapshots to javascript objects
                    return {
                        id: document.id as Key,
                        title: docData.title,
                        description: docData.description,
                        starred: docData.starred,
                        userId: docData.userId,
                        cards: docData.cards,
                        createdAt: docData.createdAt.toDate(),
                    };
                });

                setDecks(docs);
                setLoading(false);
                setLoadedListName(listName);
            } catch (error) {
                // this would be the error I threw in the code above trying to find the list using listName
                if (error instanceof Error && error.cause === "no-list-found") {
                    toast.error(error.message);
                } else {
                    toast.error("Unexpected error occured.");
                }
                navigate("/");
                logger.error(error);
            }
        };

        // before each run, loading should be set to true to indicate that the app is loading new decks
        setLoading(true);
        setLoadedListName(undefined);
        setDecks([]);
        fetchDecks();
    }, [userId, authInitializing, listName, navigate, refetch, setDecks]);

    return { decks, isLoading, refetchDecks };
};

export default useDecks;
