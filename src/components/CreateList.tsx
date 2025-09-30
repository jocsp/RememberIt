import { ToastContainer, toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
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

    // creating referencd to the list collection
    const listCollection = collection(db, "users", user.uid, "lists")

    // add list to database and store the reference to the doc on docRef | needed to add list to context with the id of the list
    const docRef = await addDoc(listCollection, {
      name: listName,
      nameSlug: slugify(listName)
    })
    
    // adding list to the context state
    addList({
      uid: docRef.id,
      name: listName,
      nameSlug: slugify(listName)
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