import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import { Deck } from "../types";

const initialState = {
    decks: [] as Deck[],
};

// purpose: save in local storage the count of decks. So the app can show the correct amount of placeholders
// during loading
const decksCountStorage = {
    // don't need to get the count of decks
    getItem: () => null,
    // set the count of decks to the amount of decks there are
    setItem: (_name: string, value: string) => {
        // get the list name from the url
        const listName = window.location.pathname.replace("/", "");

        // get the deck count
        const {
            state: { decks },
        } = JSON.parse(value);
        const deckCount = decks.length;

        // because the initial state is an empty array, the count will be set to 0
        // we ignore that count and wait for the app to fetch the decks
        // if there are no decks to fetch, the case will be handled in the loading components by
        // displaying a standard amount of decks
        if (deckCount === 0) return;

        // set the deck count to local storage
        localStorage.setItem(listName, deckCount);
    },
    removeItem: () => {},
};

interface DecksState {
    decks: Deck[];
    setDecks: (decks: Deck[]) => void;
    addDeck: (deck: Deck) => void;
}

const useDecksStore = create<DecksState>()(
    persist(
        combine(initialState, (set) => ({
            setDecks: (decks: Deck[]) => set({ decks }),
            addDeck: (newDeck: Deck) =>
                set((state) => ({ decks: [newDeck, ...state.decks] })),
        })),
        {
            name: "decks-count-storage",
            storage: createJSONStorage(() => decksCountStorage),
        },
    ),
);

export default useDecksStore;
