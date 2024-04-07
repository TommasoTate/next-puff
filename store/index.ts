import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import dayjs from 'dayjs'

interface PuffStoreState {
    dailyPuffs: number
    getPuffInterval: () => number
    firstPuffHour: number
    lastPuffHour: number
    setDailyPuffs: (puffs: number) => void
    setFirstPuffHour: (hour: number) => void
    setLastPuffHour: (hour: number) => void
}

export const usePuffStore = create(persist<PuffStoreState>(
    (set, get) => ({
        dailyPuffs: 12,
        getPuffInterval: () => {
            const firstPuff = dayjs().hour(get().firstPuffHour).minute(0).second(0)
            const lastPuff = dayjs().hour(get().lastPuffHour).minute(0).second(0)
            return lastPuff.diff(firstPuff, 'seconds') / get().dailyPuffs
        },
        firstPuffHour: 7,
        lastPuffHour: 23,
        setDailyPuffs: (puffs: number) => set({ dailyPuffs: puffs }),
        setFirstPuffHour: (hour: number) => set({ firstPuffHour: hour }),
        setLastPuffHour: (hour: number) => set({ lastPuffHour: hour }),
    }),
    {
        name: "puff-storage",
        storage: createJSONStorage(() => AsyncStorage)
    }
))