import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface FoodStoreState {
    dailyPuffs: number
    puffInterval: number
    firstPuffHour: number
    lastPuffHour: number
    setDailyPuffs: (puffs: number) => void
    setPuffInterval: (interval: number) => void
    setFirstPuffHour: (hour: number) => void
    setLastPuffHour: (hour: number) => void
}

export const useScansStore = create(persist<FoodStoreState>(
    (set) => ({
        dailyPuffs: 0,
        puffInterval: 0,
        firstPuffHour: 0,
        lastPuffHour: 0,
        setDailyPuffs: (puffs: number) => set({ dailyPuffs: puffs }),
        setPuffInterval: (interval: number) => set({ puffInterval: interval }),
        setFirstPuffHour: (hour: number) => set({ firstPuffHour: hour }),
        setLastPuffHour: (hour: number) => set({ lastPuffHour: hour }),
    }),
    {
        name: "puff-storage",
        storage: createJSONStorage(() => AsyncStorage)
    }
))