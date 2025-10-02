import { Key } from "react";

// *** ENUMS ***

enum DIFFICULTIES {
  EASY,
  NORMAL,
  HARD,
}

// *** TYPES ***

interface User {
  uid: string,
  name: string,
  email: string
  lists: List[]
}

interface List {
  uid: String;
  name: String;
  createdAt: Date;
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
  userId: String;
  title: String;
  description: String;
  createdAt: Date;
  starred: Boolean;
  cards: Card[];
}

export { DIFFICULTIES };
export type { User, List, Deck, Card };
