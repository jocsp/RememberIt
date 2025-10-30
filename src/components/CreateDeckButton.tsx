import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "./Modal";
import logger from "../utils/logger";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";

const formSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(60, "Title is too long, it should be less than 60 characters"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(
            300,
            "Description is too long, it should be less than 300 characters",
        ),
});

type FormData = z.infer<typeof formSchema>;

const CreateDeckButton = () => {
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(formSchema) });

    const submitForm: SubmitHandler<FormData> = (data) => {
        // modal should appear here
        logger.log(data);

        const result = formSchema.safeParse(data);

        if (result.success) {
            logger.log(result);
        } else {
            logger.log(result.error);
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

                        {/* <label htmlFor="description">
                            <p className="mb-1 text-md bold">Description</p>
                            {errors.description ? (
                                <p className="error-line">
                                    {errors.description.message}
                                </p>
                            ) : null}
                            <textarea
                                id="description"
                                placeholder="Write your deck description here..."
                                rows={3}
                                className="primary-input resize-none"
                                {...register("description")}
                            />
                        </label> */}

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
