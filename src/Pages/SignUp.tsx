import React, { useState } from "react";
import { auth, isLoggedIn } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const SignUp = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      console.log(isLoggedIn());
    } catch (error) {
      console.error(error);
      // replacing Firebase: and error code from error.message

      let message = (error as Error)?.message;

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
        className={`auth-form signup-form ${error ? "expanded" : ""}`}>
        <h1 className="mb-4 bold text-2xl">Sign up</h1>
        <input
          className="text-input mb-2 rounded-md border shadow-sm py-2 px-6"
          type="text"
          placeholder="Name"
          name="name"
          required
        />

        <input
          className="text-input mb-2 rounded-md border shadow-sm py-2 px-6"
          type="text"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className=" text-input mb-2 rounded-md border shadow-sm py-2 px-6"
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input className="primary-button mb-4" type="submit" value="Sign Up" />
        {error ? <div className="error mb-2">{error}</div> : null}
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
