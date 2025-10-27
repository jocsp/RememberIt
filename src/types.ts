import { Key } from "react";

// *** ENUMS ***

enum DIFFICULTIES {
    EASY,
    NORMAL,
    HARD,
}

// *** TYPES ***

interface User {
    id: string;
    name: string;
    email: string;
    lists: List[];
}

interface List {
    id: string;
    name: string;
    createdAt: Date;
}

interface Card {
    id: Key;
    question: string;
    answer: string;
    dateCreated: Date;
    dateAnswered?: Date;
    difficulty: DIFFICULTIES;
}

interface Deck {
    id: Key;
    userId: string;
    title: string;
    description: string;
    createdAt: Date;
    starred: boolean;
    cards: Card[];
}

export { DIFFICULTIES };
export type { User, List, Deck, Card };
