import { Activity } from "../types"


type CaloriesDisplayProps = {
    calories: Activity['calories']
    text: string
}   

function CaloriesDisplay({calories, text} : CaloriesDisplayProps) {
    return (
        <p className="text-white font-bold rounded-full text-lg grid grid-cols-1 gap-3 text-center">
            <span className="font-black text-6xl">{calories}</span>
            {text}
        </p>
    )
}

export default CaloriesDisplay