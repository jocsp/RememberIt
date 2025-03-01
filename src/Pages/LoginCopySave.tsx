import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FirebaseError } from "firebase/app";
import { getErrorMessage } from "../utils/firebaseErrorMessages";

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
        message = getErrorMessage("another-error/error"); // FIXME: Delete this line of code
      }

      console.log("outputing message " + message); // FIXME: Delete this line of code

      // in case the error is not a Firebase Error
      if (!message) {
        setError("An unexpected error ocurred. Please try again");
      } else {
        setError(message);
      }
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="formulario absolute flex flex-col gap-4 top-1/4 py-4 px-8 border shadow-sm rounded-sm">
        <h1 className="bold text-2xl">Login</h1>
        <input
          className="rounded-md border shadow-sm py-2 px-6"
          type="text"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className=" rounded-md border shadow-sm py-2 px-6"
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input
          className="py-2 w-1/2  sm:w-4/6 px-6 text-xl border hover:bg-violet-700 hover:cursor-pointer bg-violet-800 text-white rounded-md"
          type="submit"
          value="Login"
        />
        {error ? <div className="error">{error}</div> : null}

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
