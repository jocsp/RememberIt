import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useErrorBoundary } from "react-error-boundary";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useAuthContext from "../hooks/useAuthContext";
import SettingsIcon from "./SettingsIcon";
import burgerMenuIcon from "../assets/burger-menu-icon.svg";
import closeIcon from "../assets/close-icon.svg";
import remeberItLogo from "../assets/brain.webp";
import logger from "../utils/logger";

const NavBar = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (!menuRef.current) return;

            if (
                isMenuExpanded &&
                !menuRef.current.contains(event.target as Node)
            ) {
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
            toast.error("Error trying to log out user");
            logger.error(error);
            showBoundary(error);
        }
    };

    return (
        <nav className="navbar shadow-sm">
            <div className="logo flex gap-2 items-center">
                <img
                    className="logo-img"
                    src={remeberItLogo}
                    alt="RemeberIt logo"
                />
                <span className="rememberit">RememberIt</span>
            </div>

            {/* next ref wraps all the elements related to the mneu for the handleOutsideClick to work */}
            <div ref={menuRef}>
                <button
                    type="button"
                    onClick={() => setIsMenuExpanded(true)}
                    className="burger-menu"
                >
                    <img
                        src={burgerMenuIcon}
                        alt="Menu Icon"
                        width="40"
                        height="40"
                    />
                </button>
                {/* MENU */}
                <div
                    className={`menu text-2xl ${isMenuExpanded ? "expanded" : ""}`}
                >
                    <button
                        type="button"
                        onClick={() => setIsMenuExpanded(false)}
                        className={`close-icon ${isMenuExpanded ? "expanded" : ""}`}
                    >
                        <img
                            src={closeIcon}
                            alt="Close Icon"
                            width="40"
                            height="40"
                        />
                    </button>

                    {!user ? (
                        <>
                            <div className="salute">Howdy guest</div>

                            <button type="button" className="menu-item">
                                <SettingsIcon />
                                Settings
                            </button>
                            <Link to="/login" className="menu-item">
                                Login
                            </Link>
                            <Link to="/signup" className="menu-item">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="salute">
                                Welcome{" "}
                                <span className="salute-name">{user.name}</span>
                            </div>
                            <button type="button" className="menu-item">
                                <SettingsIcon />
                                Settings
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="menu-item"
                            >
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
