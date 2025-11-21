import { Key, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { List } from "../types";
import LoadingListItem from "./LoadingListItem";
import CreateList from "./CreateList";

const Lists = () => {
    const { listName } = useParams();
    // user contains the lists
    const { user, authInitializing } = useAuthContext();
    const { lists: userLists = [] } = user || {};
    // state to show (or not) the create list component
    const [showCreateList, setShowCreateList] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const renderLists = (lists: List[], search: string) => {
        // placeholder while the lists are fetched
        if (authInitializing) {
            return [1, 2, 3, 4, 5].map((key) => <LoadingListItem key={key} />);
        }

        // filter the lists based on the search term
        const filteredLists = lists.filter(
            // checks if the search term is included in the list name
            // case insensitive
            (list) => list.name.toLowerCase().includes(search.toLowerCase()),
        );

        // display the filtered lists
        const listElements = filteredLists.map((list) => (
            <Link
                className={`lists-item ${listName === list.id ? "active" : ""}`}
                key={list.id as Key}
                to={`/${list.id}`}
            >
                {list.name}
            </Link>
        ));

        return listElements;
    };

    return (
        <div className="lists-container">
            <div className="lists-top">
                <h2 className="lists-title">Lists</h2>
                <button
                    type="button"
                    onClick={() => {
                        setShowCreateList(true);
                    }}
                    className="new-list-button"
                >
                    + New
                </button>
            </div>
            <input
                className="list-search-bar"
                type="text"
                placeholder="Search a list..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="lists-items pt-2 pb-4 pl-1 pr-2">
                {showCreateList ? (
                    <CreateList setShowCreateList={setShowCreateList} />
                ) : null}
                {renderLists(userLists, searchTerm)}
            </div>
        </div>
    );
};

export default Lists;
