import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Deck } from "../types";

const initialState = {
    decks: [] as Deck[],
};

interface DecksState {
    decks: Deck[];
    setDecks: (decks: Deck[]) => void;
    addDeck: (deck: Deck) => void;
}

const useDecksStore = create<DecksState>()(
    combine(initialState, (set) => ({
        setDecks: (decks: Deck[]) => set({ decks }),
        addDeck: (newDeck: Deck) =>
            set((state) => ({ decks: [newDeck, ...state.decks] })),
    })),
);

export default useDecksStore;
