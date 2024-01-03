import React, {
  MouseEvent,
  useState,
  Dispatch,
  SetStateAction,
  Key,
} from "react";
import { Card, DIFFICULTIES } from "../types";
import ForwardArrow from "./ForwardArrow";
import BackwardsArrow from "./BackwardsArrow";
import useAppContext from "../hooks/useAppContext";
import { useParams } from "react-router-dom";

interface FlashCardProps {
  card: Card;
  arrayLength: number;
  setCardIndex: Dispatch<SetStateAction<number>>;
}

const FlashCard: React.FC<FlashCardProps> = ({
  card,
  arrayLength,
  setCardIndex,
}) => {
  const { id } = useParams();
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { setDifficulty } = useAppContext();

  const toggleBetweenQA = () => {
    setShowAnswer((prevValue) => !prevValue);
    setShowButtons(true);
  };

  const nextFlashCard = () => {
    setShowButtons(false);
    setShowAnswer(false);
    setCardIndex((prev: number) => {
      if (prev === arrayLength - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  const previousFlashCard = () => {
    setShowButtons(false);
    setShowAnswer(false);
    setCardIndex((prev: number) => {
      if (prev === 0) {
        return arrayLength - 1;
      }
      return prev - 1;
    });
  };

  const handleDifficulty = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;

    switch (button.innerText) {
      case "Easy":
        setDifficulty(DIFFICULTIES.EASY, id as Key, card.id);
        break;
      case "Normal":
        setDifficulty(DIFFICULTIES.NORMAL, id as Key, card.id);
        break;
      case "Hard":
        setDifficulty(DIFFICULTIES.HARD, id as Key, card.id);
        break;
      default:
        console.error("difficulty does not exist.");
        break;
    }
  };

  // when using flex flex-col I can use h-full with one of the div childs and it's going to expand that child as much as possible without affecting the rest of the elements, If I take out the flex flex-col classes, the buttons will be moved outisde the parent div because the other child is going to take 100% of the space without taking into account its siblings
  return (
    <div className="flex flex-col w-1/2 h-4/6 border-2 rounded-lg shadow-sm text-lg py-6 px-12">
      <div className="flex items-center justify-between h-full ">
        <div
          onMouseDown={previousFlashCard}
          className="border-2  rounded-full p-4 cursor-pointer hover:bg-slate-50 transition duration-75">
          <BackwardsArrow />
        </div>
        <div
          onClick={toggleBetweenQA}
          className="cursor-pointer w-full h-full flex items-center justify-center">
          {showAnswer ? <p>{card.answer}</p> : <p>{card.question}</p>}
        </div>

        <div
          onMouseDown={nextFlashCard}
          className="border-2 rounded-full p-4 cursor-pointer hover:bg-slate-50 transition duration-75">
          <ForwardArrow />
        </div>
      </div>
      <div className="flex justify-around h-[46px]">
        {showButtons ? (
          <>
            <button
              onClick={handleDifficulty}
              className="transition duration-75 bg-green-600 border hover:bg-green-500 rounded-md px-4 py-2 cursor-pointer w-32 text-white">
              Easy
            </button>
            <button
              onClick={handleDifficulty}
              className="transition duration-75 bg-slate-600 border hover:bg-slate-500 rounded-md px-4 py-2 cursor-pointer w-32 text-white">
              Normal
            </button>
            <button
              onClick={handleDifficulty}
              className="transition duration-75 bg-red-600 border hover:bg-red-500 rounded-md px-4 py-2 cursor-pointer w-32 text-white">
              Hard
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FlashCard;
