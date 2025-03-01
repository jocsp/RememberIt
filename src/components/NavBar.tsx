import remeberItLogo from "../assets/brain.png";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const NavBar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      // TODO: push a notification with toastify or a similar library with the error
      console.error(error);
      showBoundary(error);
    }
  };

  return (
    <nav className="py px-16 flex justify-between items-center shadow-sm">
      <div className="logo flex gap-2 items-center">
        <img className=" h-18 w-20" src={remeberItLogo} alt="RemeberIt logo" />
        <span className="text-4xl bold">RememberIt</span>
      </div>

      <div className="menu text-2xl flex gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-400 hover:text-black hover:underline">
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-400 hover:text-black hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/decks">Decks</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
