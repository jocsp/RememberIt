// import { useParams } from "react-router-dom";
// import useAppContext from "../hooks/useAppContext";
// import { useState, Key, useEffect } from "react";
// import { Card } from "../types";

// import FlashCard from "../components/FlashCard";

// const SingleDeck = () => {
//   const { id } = useParams();
//   const { getSingleDeck, getPendingCards } = useAppContext();
//   const deck = getSingleDeck(id as Key);
//   const [pendingCards, setPendingCards] = useState<Card[] | []>([]);
//   const [cardIndex, setCardIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setPendingCards(getPendingCards(id as Key));
//     setLoading(false);
//   }, []);

//   return (
//     <div className="h-screen flex flex-col items-center justify-center">
//       <div>
//         <p className="text-2xl bold mb-4"> {deck?.title} </p>
//       </div>

//       {loading ? (
//         <div> Loading... </div>
//       ) : (
//         <FlashCard
//           card={pendingCards[cardIndex]}
//           arrayLength={pendingCards.length}
//           setCardIndex={setCardIndex}
//         />
//       )}
//     </div>
//   );
// };

// const loader = () => {
//   return null;
// };

// export { loader };
// export default SingleDeck;
