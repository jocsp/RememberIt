import { useEffect, useState, Key } from "react";
import { getDocs, where, query, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Deck } from "../types";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

// useDecks will receive the name of the list so it can retrieve the decks of that list
const useDecks = ( listName: string | undefined) => {
  const { user, authInitializing } = useAuthContext();
  const userId = user?.id;
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDecks = async () => {
      if (!listName) {
        setLoading(false)
        setDecks([])
        // no need to return anything
        // decks page would show a message to the user to select a list
        return
      }

      // only fetches the decks if the auth process had finalized
      if (authInitializing) return

      const userId = user?.id;
      if (!userId) {
        setDecks([])
        setLoading(false);
        return
      }
      try {

        // checking if the user has a list with indicated listName || listName is already slugify
        const listRef = doc(db, "users", userId, "lists", listName);

        const listSnap = await getDoc(listRef);

        if (!listSnap.exists()) {
          throw new Error (`The list ${listName} does not exist.`, { cause: "no-list-found" })
        }

        // querying docs that belong to the user (userId) and belong to the specific list (listName) | listName is already slugify
        const q = query(collection(db, "decks"), where("userId", "==", userId), where("listId", "==", listName));

        const decksSnapshot = await getDocs(q);

        const docs = decksSnapshot.docs.map((doc): Deck => {
          const docData = doc.data();
          // transforming the doc snapshots to javascript objects
          return {
            id: doc.id as Key,
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
      } catch (error) {
        // this would be the error I threw in the code above trying to find the list using listName
        if (error instanceof Error && error.cause == "no-list-found") {
          console.error(error.message)
          // TODO: Add a toast notification error showing the error
          navigate("/")
        }
        console.error(error);
      }
    };

    // before each run, loading should be set to true to indicate that the app is loading new decks
    setLoading(true)
    setDecks([])
    fetchDecks();
  }, [userId, authInitializing, listName]);

  return { decks, loading };
};

export default useDecks;
