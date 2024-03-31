import { useContext } from "react"
import ActivityContext from "../context/ActivityContext"

const useActivity = () =>{
    const context = useContext(ActivityContext)
    if(!context) throw new Error("Hay un problema con useActivity")
    return context
}

export default useActivity