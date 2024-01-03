import { createContext, useReducer, Key } from "react";
import { Card, Deck, DIFFICULTIES } from "../types";
import initDecks from "../data";
import { daysBetween } from "../scripts/dates";

interface stateType {
  decks: Deck[];
}

interface AppContextValue {
  state: stateType;
  getSingleDeck: (deckId: Key) => Deck | undefined;
  getPendingCards: (deckId: Key) => Card[] | [];
  setDifficulty: (
    difficulty: DIFFICULTIES,
    deckId: Key,
    flashcardId: Key
  ) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

enum REDUCER_ACTION_TYPE {
  SET_DIFFICULTY,
  PLACEHOLDER2,
  PLACEHOLDER3,
}

interface ActionType {
  type: REDUCER_ACTION_TYPE;
  payload: any;
}

const decksReducer = (state: stateType, action: ActionType): stateType => {
  const { type, payload } = action;
  switch (type) {
    case REDUCER_ACTION_TYPE.SET_DIFFICULTY:
      return state;

    default:
      throw new Error("The action.type does not exist");
  }
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(decksReducer, { decks: initDecks });

  const getSingleDeck = (deckId: Key): Deck | undefined => {
    const deckFound: Deck | undefined = state.decks.find(
      (deck: Deck) => deck.id === deckId
    );

    return deckFound;
  };

  const getPendingCards = (deckId: Key): Card[] | [] => {
    const deck = getSingleDeck(deckId);

    if (!deck) {
      return [];
    }

    if (!deck.cards) {
      return [];
    }

    const pendingCards = deck.cards.filter((card) => {
      const daysPassed = daysBetween(card.dateAnswered);

      if (!daysPassed) {
        return card;
      }
      switch (card.difficulty) {
        case DIFFICULTIES.EASY:
          if (daysPassed >= 3) {
            return card;
          }
          break;
        case DIFFICULTIES.NORMAL:
          if (daysPassed >= 1) {
            return card;
          }
          break;
        case DIFFICULTIES.HARD:
          return card;
          break;
        default:
          console.log("difficulty does not exist");
          break;
      }
    });

    return pendingCards;
  };

  const setDifficulty = (
    difficulty: DIFFICULTIES,
    deckId: Key,
    flashcardId: Key
  ) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_DIFFICULTY,
      payload: { difficulty, deckId, flashcardId },
    });
  };

  return (
    <AppContext.Provider
      value={{ state, getSingleDeck, getPendingCards, setDifficulty }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
