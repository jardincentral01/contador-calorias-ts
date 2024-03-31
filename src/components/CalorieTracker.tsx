import CaloriesDisplay from "./CaloriesDisplay"
import useActivity from "../hooks/useActivity"

function CalorieTracker() {

    const { caloriesConsumed, caloriesBurned, caloriesBalance } = useActivity()

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorías</h2>

            <div className="grid grid-cols-1 items-center md:grid-cols-3 md:justify-between gap-5 mt-10">
                <div className="py-14">
                    <CaloriesDisplay
                        calories={caloriesConsumed}
                        text="Consumidas"
                    />
                </div>
                <div className="py-14">
                    <CaloriesDisplay
                        calories={caloriesBurned}
                        text="Quemadas"
                    />
                </div>
                <div className="bg-lime-500 py-14">
                    <CaloriesDisplay
                        calories={caloriesBalance}
                        text="Diferencia"
                    />
                </div>
            </div>
        </>
    )
}

export default CalorieTracker