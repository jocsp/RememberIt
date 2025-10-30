import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import NavBar from "../components/NavBar";
import slugify from "../utils/slugify";
import logger from "../utils/logger";

const SignUp = () => {
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            // update displayName to use it in the navbar
            const { user } = userCredential;
            await updateProfile(user, { displayName: name });

            // save user to database, so I could store there all the things I need
            await setDoc(doc(db, "users", user.uid), {
                displayName: user.displayName || "",
                email: user.email,
            });

            // creating rereference to list document under lists subcollection
            // setting the id as the slug name
            const listDocRef = doc(
                db,
                "users",
                user.uid,
                "lists",
                slugify("My List"),
            );

            // adding the list to the database
            await setDoc(listDocRef, {
                name: "My List",
                createdAt: serverTimestamp(),
            });
        } catch (err) {
            logger.error(err);
            // replacing Firebase: and error code from error.message
            const message = (err as Error)?.message;

            if (!message) {
                setError("Something went wrong!");
            } else {
                setError(message);
            }
        }
    };

    return (
        <div className="auth-container">
            <NavBar />
            <form
                onSubmit={handleSubmit}
                className={`auth-form signup-form ${error ? "expanded" : ""}`}
            >
                <h1 className="mb-4 bold text-2xl">Sign up</h1>
                <input
                    className="primary-input mb-4"
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                />

                <input
                    className="primary-input mb-4"
                    type="text"
                    placeholder="Email"
                    name="email"
                    required
                />
                <input
                    className="primary-input mb-4"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                />
                <input
                    className="primary-button mb-4 mt-4"
                    type="submit"
                    value="Sign Up"
                />
                {error ? <div className="error-box mb-2">{error}</div> : null}
                <p>
                    Already have an account? Log in{" "}
                    <Link to="/login" className="underline text-sky-600">
                        here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
