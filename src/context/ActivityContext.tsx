import { createContext, Dispatch, PropsWithChildren, useReducer, useMemo, useCallback } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer";
import type { Activity, Category } from "../types";
import { categories } from "../data/categories";

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    isEmptyActivities: boolean
    caloriesBurned: number
    caloriesConsumed: number
    caloriesBalance: number,
    categoryName: (categoryValue: Activity['category']) => Category | undefined
}

const ActivityContext = createContext<ActivityContextProps>(null!)

export function ActivityProvider({children} : PropsWithChildren) {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    const isEmptyActivities = useMemo(() => state.activities.length == 0, [state.activities])
    const caloriesBurned = useMemo(() => state.activities.reduce((acc, act) => act.category == 1 ? acc + act.calories : acc, 0), [state.activities])
    const caloriesConsumed = useMemo(() => state.activities.reduce((acc, act) => act.category == 2 ? acc + act.calories : acc, 0), [state.activities])
    const caloriesBalance = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    const categoryName = useCallback(
        (categoryValue: Activity['category']) => categories.find(category => (category.value == categoryValue)) 
    , [state.activities])

    return (
        <ActivityContext.Provider
            value={{
                state,
                dispatch,
                isEmptyActivities,
                caloriesBurned,
                caloriesConsumed,
                caloriesBalance,
                categoryName
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}

export default ActivityContext