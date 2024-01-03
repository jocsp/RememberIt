import { Card, Deck, DIFFICULTIES } from "./types";
import { v4 as uuidv4 } from "uuid";

const math1: Card = {
  id: uuidv4(),
  question: "The number we get when we multiply one number by another",
  answer: "Multiple",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const math2: Card = {
  id: uuidv4(),
  question: "The numbers multiplied together to get a product",
  answer: "Factor",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const math3: Card = {
  id: uuidv4(),
  question: "The only factors of this number are one and itself",
  answer: "Prime number",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const math4: Card = {
  id: uuidv4(),
  question: "The answer to a division problem",
  answer: "Quotient",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const math5: Card = {
  id: uuidv4(),
  question: "The distance around an object",
  answer: "Perimeter",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};

const movie1: Card = {
  id: uuidv4(),
  question: "The girl has long hair",
  answer: "Tangled",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const movie2: Card = {
  id: uuidv4(),
  question: "He gets a long nose",
  answer: "Pinochio",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const movie3: Card = {
  id: uuidv4(),
  question: "There is a deer in this movie",
  answer: "Bambi",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const movie4: Card = {
  id: uuidv4(),
  question: "Don't eat the apple",
  answer: "Snow White",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};
const movie5: Card = {
  id: uuidv4(),
  question: "Black and white ninja",
  answer: "Kung Fu Panda",
  dateCreated: new Date(),
  difficulty: DIFFICULTIES.EASY,
};

const initDecks: Deck[] = [
  {
    id: "e9b84188-aed3-4723-92c7-bc065fa0ac27",
    title: "Math terms",
    description:
      "Colorful math flashcards, each a tiny universe of equations and concepts, await eager minds, sparking numerical enlightenment.",
    dateCreated: new Date(),
    starred: false,
    cards: [math1, math2, math3, math4, math5],
  },

  {
    id: "244b139e-81ea-49c7-9fad-5f5b52f7f266",
    title: "Movies",
    description:
      "This is a movie trivia where you have to guess the movie from a hint given.",
    dateCreated: new Date(),
    starred: true,
    cards: [movie1, movie2, movie3, movie4, movie5],
  },
];

export default initDecks;
