import { useEffect, useRef } from "react";
import closeIcon from "../assets/close-icon.svg";

interface Props {
    children: React.ReactNode;
    showingModal: boolean;
    onClose: () => void;
}
const Modal = ({ children, showingModal, onClose }: Props) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const ignoreClickOutsideRef = useRef(true);
    useEffect(() => {
        // change ignoreClickOutsideRef.current to false so it can be used inside of
        // handleClickOutside to ignore the first time the function is called
        const timer = setTimeout(() => {
            if (showingModal) {
                ignoreClickOutsideRef.current = false;
            } else {
                ignoreClickOutsideRef.current = true;
            }
        }, 0);

        // close the modal when the user presses escape
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        // close the modal if the user clicks outside of it
        const handleClickOutside = (e: MouseEvent) => {
            // this line ignores the first call of the event, right after the modal opens
            if (ignoreClickOutsideRef.current) return;
            if (!modalRef.current?.contains(e.target as Node)) {
                onClose();
            }
        };

        if (showingModal) {
            // event so the user can close the modal by pressing escape
            document.addEventListener("keydown", handleEscKey);
            // event so the user can close the modal by clicking outside of it
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            // cleaning up the timer and the event listeners
            document.removeEventListener("keydown", handleEscKey);
            document.removeEventListener("click", handleClickOutside);
            clearTimeout(timer);
        };
    }, [onClose, showingModal]);

    return (
        <div
            className={showingModal ? "modal-backdrop show" : "modal-backdrop"}
        >
            <div
                ref={modalRef}
                className={showingModal ? "modal show" : "modal"}
            >
                <div className="flex justify-start">
                    <button type="button" onMouseUp={() => onClose()}>
                        <img src={closeIcon} alt="Close Modal" />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
