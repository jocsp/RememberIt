// import { createContext, useReducer } from 'react'

// export const ListsContext = createContext(null)


// // reducer
// const listsReducer = (lists, action) => {
//     switch(action.type) {
//         case "set":
//             return action.payload
//         case "update":
//             return [...lists, action.payload]
//         //case "delete":
//         //    return [...lists]
//         default:
//             return lists
//     }
// }

// const ListsContextProvider = () => {
//     const [lists, dispatch] = useReducer(listsReducer, null);

//     return (
//         // return provider with values
//         <div>Lists Context Provider</div>
//     )
// }

// export default ListsContextProvider