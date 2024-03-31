import { useEffect } from "react";
import Form from "./components/Form"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import useActivity from "./hooks/useActivity";

function App() {

    const { state, dispatch, isEmptyActivities } = useActivity()

    useEffect(() => {
        localStorage.setItem("activities", JSON.stringify(state.activities))
    }, [state.activities])
    
    return (
        <>
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorías</h1>

                    <button 
                        onClick={() => dispatch({ type: "reset-activities" })}
                        className="bg-gray-800 hover:bg-gray-900 disabled:opacity-10 text-white uppercase font-bold p-2 rounded-lg cursor-pointer text-sm transition-all"
                        disabled={isEmptyActivities}
                    >Reiniciar App</button>
                </div>
            </header>

            <section className="bg-lime-500 px-5 py-20">
                <div className="max-w-4xl mx-auto">
                    <Form/>
                </div>
            </section>

            <section className="bg-gray-800 pt-10 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <CalorieTracker/>
                </div>
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList/>
            </section>
        </>
    )
}

export default App
