import { Key, useState } from "react";
import { Link, useParams } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
import { List } from "../types"
import LoadingListItem from "./LoadingListItem";
import CreateList from "./CreateList";

const Lists = () => {
  const { listName } = useParams();
  // user contains the lists
  const { user, authInitializing } = useAuthContext()
  const { lists = [] } = user || {}
  // state to show (or not) the create list component
  const [showCreateList, setShowCreateList] = useState(false);

  const renderLists = (lists: List[]) => {
    // placeholder while the lists are fetched
    if (authInitializing) {
      return [1,2, 3, 4, 5].map((key) => {
        return <LoadingListItem key={key} /> 
      })
    }

    const listElements = lists.map(list => {
      return (
        <Link className={`lists-item ${listName == list.nameSlug ? "active" : ""}`} key={list.uid as Key} to={`/${list.nameSlug}`}>
          {list.name}
        </Link>
      )
    })

    return listElements
  }
  
  return (
    <div className="lists-container">
      <div className="lists-top">
        <h2 className="lists-title">Lists</h2>
        <button onClick={() => { setShowCreateList(true)}} className="new-list-button">+ New</button>
      </div>
      <input className="list-search-bar" type="text" placeholder="Search a list..."/>
      <div className="lists-items">
        {showCreateList ? <CreateList setShowCreateList={setShowCreateList} /> : null}
        {renderLists(lists)}
      </div>
    </div>
  )
}

export default Lists