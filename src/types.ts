import { Key } from "react";

enum DIFFICULTIES {
  EASY,
  NORMAL,
  HARD,
}
interface Card {
  id: Key;
  question: String;
  answer: String;
  dateCreated: Date;
  dateAnswered?: Date;
  difficulty: DIFFICULTIES;
}

interface Deck {
  id: Key;
  title: String;
  description: String;
  dateCreated: Date;
  starred: Boolean;
  cards: Card[];
}

export { DIFFICULTIES };
export type { Deck, Card };
