import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import useActivity from "../hooks/useActivity"

function ActivityList() {

    const { state: {activities}, dispatch, isEmptyActivities, categoryName } = useActivity()

    return (
        <>
            <h2 className='text-4xl font-bold text-slate-600 text-center'>Comida y Actividades</h2>

            {isEmptyActivities ? 
                <p className="text-center mt-10">No Hay Actividades Aún</p>
            : 
                activities.map(activity => (
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex items-center justify-between">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 uppercase text-white font-bold ${activity.category == 2 ? "bg-lime-500" : "bg-orange-500"}`}>{categoryName(+activity.category)?.label}</p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className={`font-black text-4xl ${activity.category == 2 ? "text-lime-500" : "text-orange-500"}`}>{activity.calories} <span>Calorias</span></p>
                        </div>

                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                            >
                                <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                            </button>

                            <button
                                onClick={() => dispatch({ type: "remove-activity", payload: { id: activity.id } })}
                            >
                                <TrashIcon className="h-8 w-8 text-gray-800"/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ActivityList