import { useState, useEffect, useMemo } from "react"
import {v4 as uuidv4} from "uuid"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import useActivity from "../hooks/useActivity"


const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}

function Form() {

    const [activity, setActivity] = useState<Activity>(initialState)
    const { state, dispatch } = useActivity()

    useEffect(() => {
        if(state.activeId){
            setActivity(state.activities.find(act => act.id == state.activeId)!)
        }
    }, [state.activeId])

    //validamos que los datos sean correctos
    const isValidActivity = useMemo(() =>{
        const { name, calories } = activity;
        return name.trim() != "" && calories > 0;
    }, [activity])

    //Insertamos datos en el state
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>{
        const isNumberField = ["category", "calories"].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    //Submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        dispatch({ type: "save-activity", payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    // Nos devuelve el label de la categoria seleccionada para mostrarlo en el boton
    const { label } = categories.find(category => category?.value == activity?.category)!

    return (
        <form 
            className="space-y-5 bg-white rounded-lg shadow p-10"
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor="category" className="font-bold">Tipo:</label>
                <select 
                    id="category" 
                    className="w-full border border-slate-300 p-2 rounded-lg bg-white mt-3"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                    id="name" 
                    type="text" 
                    className="w-full border border-slate-300 p-2 rounded-lg bg-white mt-3" 
                    placeholder="Nombre de la Actividad"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="calories" className="font-bold">Calories:</label>
                <input 
                    id="calories" 
                    type="number" 
                    className="w-full border border-slate-300 p-2 rounded-lg bg-white mt-3" 
                    placeholder="Ingresa la Calorias"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase cursor-pointer text-white transition-all disabled:opacity-10 disabled:cursor-default" 
                value={`Guardar ${label}`}
                disabled={!isValidActivity}
            />
        </form>
    )
}

export default Form