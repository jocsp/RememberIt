import { useEffect, useState, Key } from "react";
import { getDocs, where, query, collection } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Deck } from "../types";

const useDecks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        return null;
      }

      try {
        const q = query(collection(db, "decks"), where("userId", "==", userId));

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
        console.log(error);
      }
    };

    fetchDecks();
  }, [auth]);

  return { decks, loading };
};

export default useDecks;
