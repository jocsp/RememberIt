import brainMascot from "../assets/no_list_image.webp";

const NoLists = () => (
    <div className="no-list">
        <h2>
            Select a list or create a new one from the left panel to get started
        </h2>
        <img src={brainMascot} alt="Brain Mascot Pointing Left" />
    </div>
);

export default NoLists;
