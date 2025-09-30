import { useEffect, useState, Key } from "react";
import { getDocs, where, query, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Deck } from "../types";
import useAuthContext from "./useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { AirlineSeatLegroomReducedSharp } from "@mui/icons-material";

// useDecks will receive the name of the list so it can retrieve the decks of that list
const useDecks = ( listName: string | undefined) => {
  const { user, authInitializing } = useAuthContext();
  const userId = user?.uid;
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

      const userId = user?.uid;
      if (!userId) {
        setDecks([])
        setLoading(false);
        return
      }
      try {

        // checking if the user has a list with indicated listName
        const qList = query(collection(db, "users", userId, "lists"), where("nameSlug", "==", listName));

        const listSnapshot = await getDocs(qList);

        if (listSnapshot.empty) {
          throw new Error (`The list ${listName} does not exist.`, { cause: "no-list-found" })
        }

        // querying docs that belong to the user (userId) and belong to the specific list (listName)
        const q = query(collection(db, "decks"), where("userId", "==", userId), where("listName", "==", listName));

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
            dateCreated: docData.dateCreated,
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
