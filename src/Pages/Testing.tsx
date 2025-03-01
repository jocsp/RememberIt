import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Key, ReactNode, useState } from "react";

interface User {
  id: String;
  firstname: String;
  lastname: String;
  email: String;
  username: String;
  password: String;
}

interface Deck {
  id: String;
  userId: String;
  title: String;
  description: String;
}

const Testing = () => {
  const [user, setUser] = useState<User | null>(null);
  const [decks, setDecks] = useState<Deck[] | []>([]);
  const [cards, setCards] = useState([]);

  const addNewDeck = async () => {
    const deck = {
      description: "Deck about math",
      title: "Math Terms",
      starred: false,
      userId: "random user id",
      dateCreated: new Date(),
      cards: [],
    };

    await addDoc(collection(db, "decks"), deck);
  };

  const addCards = async () => {
    const card = {
      question: "What does the pythagorean theorem say?",
      answer: "It says that right triangles are cool",
    };
    const docRef = doc(db, "decks", "random user id");
    const collectionRef = collection(docRef, "cards");

    await addDoc(collectionRef, card);
  };

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    const user = await addDoc(collection(db, "users"), {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password"),
    });

    localStorage.setItem("userID", user.id);

    const deck = await addDoc(collection(db, "decks"), {
      title: data.get("title"),
      description: data.get("description"),
      userId: user.id,
    });

    await addDoc(collection(db, "cards"), {
      cardQuestion: data.get("cardquestion"),
      cardAnswer: data.get("cardanswer"),
      deckId: deck.id,
    });
  };

  const getUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    const q = query(
      collection(db, "users"),
      where("username", "==", data.get("username"))
    );

    const querySnapshot = await getDocs(q);

    const docSnapshot = querySnapshot.docs[0];

    const decksQuery = query(
      collection(db, "decks"),
      where("userId", "==", docSnapshot.id)
    );

    const decksSnapshot = await getDocs(decksQuery);

    const { firstname, lastname, email, username, password } =
      docSnapshot.data();

    setUser({
      id: docSnapshot.id,
      firstname,
      lastname,
      email,
      username,
      password,
    });

    setDecks(
      decksSnapshot.docs.map((deckSnapshot) => {
        const { title, description, userId } = deckSnapshot.data();
        return { id: deckSnapshot.id, title, description, userId };
      })
    );
  };

  return (
    <div>
      <form
        onSubmit={addUser}
        className="m-6 flex flex-col gap-5 justify-center ">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          className="py-2 px-5 border rounded-md w-1/2"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          className="py-2 px-5 border rounded-md w-1/2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="py-2 px-5 border rounded-md w-1/2"
        />
        <input
          type="text"
          name="username"
          placeholder="User"
          className="py-2 px-5 border rounded-md w-1/2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="py-2 px-5 border rounded-md w-1/2"
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="py-2 px-5 border rounded-md w-1/2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="py-2 px-5 border rounded-md w-1/2"
        />
        <input
          type="text"
          name="cardquestion"
          placeholder="Card Question"
          className="py-2 px-5 border rounded-md w-1/2"
        />

        <input
          type="text"
          name="cardanswer"
          placeholder="Card Answer"
          className="py-2 px-5 border rounded-md w-1/2"
        />

        <input
          type="submit"
          value="Add User"
          className="py-2 px-5 border rounded-md w-1/6 bg-green-600 text-white"
        />
      </form>

      <form
        onSubmit={getUser}
        className="m-6 flex flex-col gap-5 justify-center ">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="py-2 px-5 border rounded-md w-1/2"
        />
        <input
          type="submit"
          value="Get Info"
          className="py-2 px-5 border rounded-md w-1/6 bg-green-600 text-white"
        />
      </form>

      <div className="info">
        {user ? (
          <h1 className="m-6 px-5 text-2xl bold">Welcome, {user.firstname} </h1>
        ) : null}

        {decks.map((deck) => {
          return (
            <div key={deck.id as Key} className="deck-card m-5 w-1/12">
              <div className="rounded-t-md  flex justify-between">
                <p className="text-lg">{deck.title}</p>
              </div>
              <div>
                <p>
                  {deck.description.length > 150
                    ? deck.description.substring(0, 150)
                    : deck.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="bg-green-400 px-8 py-4" onClick={addNewDeck}>
        {" "}
        Add New Deck
      </button>

      <button className="bg-green-400 px-8 py-4" onClick={addCards}>
        Add cards to deck
      </button>
    </div>
  );
};

export default Testing;
