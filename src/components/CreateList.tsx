import { toast } from "react-toastify";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef } from "react"
import { db } from "../firebaseConfig";
import useAuthContext from "../hooks/useAuthContext";
import slugify from "../utils/slugify";

type CreateListProps = {
  setShowCreateList: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateList = ({ setShowCreateList }: CreateListProps) => {
  // create the sate
  const listRef = useRef<HTMLInputElement | null>(null)
  const { user, addList } = useAuthContext()

  useEffect(() => {
    // focusing input as soon as it displays on screen
    if (listRef.current) {
      listRef.current.focus()
    }

    // adds event listener with some delay, to avoid the click being detected when clikcing new list button
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside)
    }, 0)
    
    // will remove listener and clear the timeout when the component unmounts
    return () => {
      clearTimeout(timer)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
      
      if (!listRef.current || !(event)) return

      if (!listRef.current?.contains(event.target as Node)) {
        return handleSubmit()
      }
    }

  const handleSubmit = async () => {
    try {
      // checking if the listRef.current is not null
    if (!listRef.current) {
      throw new Error("listRef.current is null")
    }
    
    // getting list name from the input ref value
    const listName = listRef.current.value

    if (listName === "") {
      // hide Create List component
      setShowCreateList(false)
      return
    }

    if (!user) {
      throw new Error("Can't create list. User is null")
    }

    // creating a referecen to a list using the name slug as the id
    const listDocRef = doc(db, "users", user.uid, "lists", slugify(listName))

    // running a transaction to check if the list already exists in the database
    await runTransaction(db, async (transaction) => {

      const docSnap = await transaction.get(listDocRef)

      // throw an error if it already exists
      if (docSnap.exists()) {
        throw new Error("List already exists, please use a different name.")
      }

      const newList = {
        name: listName,
        createdAt: serverTimestamp()
      }

      // add the list to the db using name slug for the id
      transaction.set(listDocRef, newList)
    })
    
    // adding list to the context state
    addList({
    uid: listDocRef.id,
      name: listName,
      createdAt: new Date()
    })

    toast.success("List created successfully", {
      autoClose: 3000,
    })

    } catch (error) {
      console.error(error)
      toast.error("Could not create the list. Please try again", {
        autoClose: 3000
      })
    } 
    // hide Create List component
    setShowCreateList(false)
  }

  return (
    <form onSubmit={(e) => {e.preventDefault(); return handleSubmit()}}>
      <input ref={listRef} className="create-list" type="text" placeholder="List Name"></input>
    </form>
  )
}

export default CreateList