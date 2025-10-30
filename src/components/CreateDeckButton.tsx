import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "./Modal";
import logger from "../utils/logger";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import useAuthContext from "../hooks/useAuthContext";
import { db } from "../firebaseConfig";

const formSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(60, "Title is too long, it should be less than 60 characters").trim(),
    description: z
        .string()
        .min(1, "Description is required")
        .max(
            300,
            "Description is too long, it should be less than 300 characters",
        ).trim(),
});

type FormData = z.infer<typeof formSchema>;

interface CreateDeckButtonProps {
    refetchDecks: () => void;
}

const CreateDeckButton = ({ refetchDecks }: CreateDeckButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuthContext();
    const { listName } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(formSchema) });

    const submitForm: SubmitHandler<FormData> = async (data) => {
        // validating form data
        try {
            // if the data is not valid this will throw an error
            // and stop the submission process
            const validatedFields = formSchema.parse(data);
            
            const deckData = {
                ...validatedFields,
                starred: false,
                userId: user?.id,
                listId: listName,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "decks"), deckData);

            setShowModal(false);
            reset();
            refetchDecks();
            toast.success("Deck created successfully!");
        } catch (error) {
            logger.error(error);

            if (error instanceof z.ZodError) {
                toast.error("Please fix the errors in the form before submitting.");
            } else {
                toast.error("An error occurred while creating the deck. Please try again.");
            }
        }
    };
    return (
        <>
            <button
                type="button"
                className="deck-card flex justify-center items-center"
                onClick={() => setShowModal(true)}
            >
                <AddRoundedIcon sx={{ fontSize: "clamp(3rem,4.2vw,4.5rem)" }} />
            </button>

            <Modal showingModal={showModal} onClose={() => setShowModal(false)}>
                <div className="p-4">
                    <h2 className="text-3xl bold">Create Deck</h2>
                    <p className="text-sm text-gray-600">
                        Please fill out the fields to create a deck
                    </p>
                    <form
                        className="flex flex-col gap-2 mt-4"
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <TextInput
                            label="title"
                            placeholder="Deck Title"
                            register={register}
                            error={errors.title}
                        />

                        <TextAreaInput
                            label="description"
                            placeholder="Write your deck description here..."
                            register={register}
                            error={errors.description}
                        />

                        <input type="submit" className="primary-button" />
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default CreateDeckButton;
