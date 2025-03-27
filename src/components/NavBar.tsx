import "./navbar.css";
import remeberItLogo from "../assets/brain.png";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import burgerMenuIcon from "../assets/burger-menu-icon.svg";
import closeIcon from "../assets/close-icon.svg";
import { useEffect, useRef, useState } from "react";

const NavBar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!menuRef.current) return;

      if (isMenuExpanded && !menuRef.current.contains(event.target as Node)) {
        setIsMenuExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuExpanded]);

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
    <nav className="navbar shadow-sm">
      <div className="logo flex gap-2 items-center">
        <img className="logo-img" src={remeberItLogo} alt="RemeberIt logo" />
        <span className="rememberit">RememberIt</span>
      </div>

      {/* next ref wraps all the elements related to the mneu for the handleOutsideClick to work */}
      <div ref={menuRef}>
        <button onClick={() => setIsMenuExpanded(true)} className="burger-menu">
          <img src={burgerMenuIcon} alt="Menu Icon" width="40" height="40" />
        </button>
        {/* MENU */}
        <div className={`menu text-2xl ${isMenuExpanded ? "expanded" : ""}`}>
          <button
            onClick={() => setIsMenuExpanded(false)}
            className={`close-icon ${isMenuExpanded ? "expanded" : ""}`}>
            <img src={closeIcon} alt="Close Icon" width="40" height="40" />
          </button>

          <Link to="/explore" className="menu-item">
            Explore
          </Link>
          <Link to="/mydecks" className="menu-item">
            My Decks
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="menu-item">
                Login
              </Link>
              <Link to="/signup" className="menu-item">
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
      </div>
    </nav>
  );
};

export default NavBar;
