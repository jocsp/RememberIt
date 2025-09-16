import { Key } from "react";
import { Link, useParams } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
import { List } from "../types"

const Lists = () => {
  const {listName} = useParams();
  // user contains the lists
  const { user } = useAuthContext()
  const { lists = [] } = user || {}

  console.log(user)

  const renderLists = (lists: List[]) => {

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
        <button className="new-list-button">+ New</button>
      </div>
      <div className="lists-items">
        {renderLists(lists)}
      </div>
    </div>
  )
}

export default Lists