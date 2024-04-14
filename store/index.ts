import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import dayjs from 'dayjs'

interface PuffStoreState {
    dailyPuffs: number
    dailyPuffsCount: number
    firstPuffHour: number
    lastPuffHour: number
    intervalIncrement: number
    getPuffInterval: () => number
    getPuffIntervals: () => dayjs.Dayjs[]
    setDailyPuffs: (puffs: number) => void
    setFirstPuffHour: (hour: number) => void
    setLastPuffHour: (hour: number) => void
    incrementDailyPuffsCount: () => void
    getNextPuffTime: () => dayjs.Dayjs
    reset: () => void
}

const defaultState: Partial<PuffStoreState> = {
    dailyPuffs: 12,
    dailyPuffsCount: 0,
    firstPuffHour: 7,
    lastPuffHour: 23,
    intervalIncrement: 0
}

export const usePuffStore = create(persist<PuffStoreState>(
    (set, get) => ({
        dailyPuffsCount: 0,
        dailyPuffs: 12,
        intervalIncrement: 0,
        getPuffInterval: () => {
            const firstPuff = dayjs().hour(get().firstPuffHour).minute(0).second(0)
            const lastPuff = dayjs().hour(get().lastPuffHour).minute(0).second(0)
            return lastPuff.diff(firstPuff) / get().dailyPuffs
        },
        getPuffIntervals: () => {
            const firstPuff = dayjs().hour(get().firstPuffHour).minute(0).second(0)
            const lastPuff = dayjs().hour(get().lastPuffHour).minute(0).second(0)
            const interval = lastPuff.diff(firstPuff) / (get().dailyPuffs - 1)
            return Array.from({ length: get().dailyPuffs }, (_, i) => firstPuff.add((interval * i) + (get().intervalIncrement * 60 * 1000), 'millisecond'))
        },
        firstPuffHour: 7,
        lastPuffHour: 23,
        setDailyPuffs: (puffs: number) => set({ dailyPuffs: puffs }),
        setFirstPuffHour: (hour: number) => set({ firstPuffHour: hour }),
        setLastPuffHour: (hour: number) => set({ lastPuffHour: hour }),
        incrementDailyPuffsCount: () => set(state => ({ dailyPuffsCount: state.dailyPuffsCount + 1 })),
        getNextPuffTime: () => {
            const intervals = get().getPuffIntervals()
            return intervals.slice(get().dailyPuffsCount).find(interval => interval.isAfter(dayjs())) ?? intervals[0]
        },
        reset: () => set(defaultState),
    }),
    {
        name: "puff-storage",
        storage: createJSONStorage(() => AsyncStorage)
    }
))