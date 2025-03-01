import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { getErrorMessage } from "../utils/firebaseErrorMessages";
import NavBar from "../components/NavBar";

const Login = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let message = "";

      if (error instanceof FirebaseError) {
        // getting custom message based on firebase code
        message = getErrorMessage(error.code);
      }

      // in case the error is not a Firebase Error
      if (!message) {
        setError("An unexpected error ocurred. Please try again");
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
        className={`auth-form login-form ${error ? "expanded" : ""}`}>
        <h1 className="mb-4 bold text-2xl">Login</h1>
        <input
          className="text-input mb-2 rounded-md border shadow-sm py-2 px-6"
          type="text"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className="text-input mb-4 rounded-md border shadow-sm py-2 px-6"
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input className="primary-button mb-4" type="submit" value="Login" />

        {error ? <div className="error mb-2">{error}</div> : null}

        <p>
          Don't have an account? Sign up{" "}
          <Link to="/signup" className="underline text-sky-600">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
