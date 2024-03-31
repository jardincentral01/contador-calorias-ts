import type { Activity } from "../types";

export type ActivityActions = 
    { type: "save-activity", payload: { newActivity: Activity } } |
    { type: "set-activeId", payload: { id: Activity['id'] } } |
    { type: "remove-activity", payload: { id: Activity['id'] } } |
    { type: "reset-activities" }

export type ActivityState = {
    activities: Activity[]
    activeId: Activity['id']
}

export const initialState : ActivityState = {
    activities: JSON.parse(localStorage.getItem("activities")!) || [],
    activeId: ""
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions 
) => {

    if(action.type == "save-activity"){

        let updatedActivities : Activity[] = []
        if(state.activeId){
            updatedActivities = state.activities.map(act => act.id == state.activeId ? action.payload.newActivity : act)
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activeId: "",
            activities: updatedActivities
        }
    }

    if(action.type == "set-activeId"){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type == "remove-activity"){
        const updatedActivities = state.activities.filter(act => act.id != action.payload.id)
        return {
            ...state,
            activeId: "",
            activities: updatedActivities
        }
    }

    if(action.type == "reset-activities"){
        return {
            activities: [],
            activeId: ""
        }
    }

    return state
}