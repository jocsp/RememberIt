import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Deck } from "../types";

interface DeckCardProps {
    deck: Deck;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
    return (
        <div className="deck-card">
            <div className="rounded-t-md  flex justify-between">
                <p className="text-xl font-bold">{deck.title}</p>
                <div className={deck.starred ? "star" : "star opacity-0"}>
                    {deck.starred ? <StarIcon /> : <StarBorderOutlinedIcon />}
                </div>
            </div>
            <div>
                <p className="mt-5">
                    {deck.description.length > 150
                        ? deck.description.substring(0, 150) + "..."
                        : deck.description}
                </p>
            </div>
        </div>
    );
};

export default DeckCard;
