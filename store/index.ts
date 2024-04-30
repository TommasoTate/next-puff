import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import dayjs from 'dayjs'
import {produce} from 'immer'

type BaseSettings = {
    dailyPuffs: number
    firstPuffHour: number
    lastPuffHour: number
    intervalIncrement: number
}


type DailyData = {
    [key: string]: {
        puffs: number,
        intervals: Date[]
        intervalIncrement: number
    }
}
interface PuffStoreState {
    baseSettings: BaseSettings
    dailyData: DailyData
}

interface PuffStoreActions {
    getPuffInterval: () => number
    getPuffIntervals: () => Date[]
    setDailyPuffs: (puffs: number) => void
    setFirstPuffHour: (hour: number) => void
    setLastPuffHour: (hour: number) => void
    incrementDailyPuffsCount: () => void
    getNextPuffTime: () => Date
    reset: () => void
}


const defaultState: PuffStoreState = {
    baseSettings: {
        dailyPuffs: 12,
        firstPuffHour: 7,
        lastPuffHour: 23,
        intervalIncrement: 5
    },
    dailyData: {},
}

export const usePuffStore = create(persist<PuffStoreState & PuffStoreActions>(
    (set, get) => ({
        ...defaultState,
        getPuffInterval: () => {
            const firstPuff = dayjs().hour(get().baseSettings.firstPuffHour).minute(0).second(0)
            const lastPuff = dayjs().hour(get().baseSettings.lastPuffHour).minute(0).second(0)
            return lastPuff.diff(firstPuff) / get().baseSettings.dailyPuffs
        },
        getPuffIntervals: () => {
            const key = dayjs().format('YYYYMMDD')

            // If intervals has been already calculated for today, return it
            const intervals = get().dailyData[key]?.intervals
            if(intervals) return intervals

            const firstPuff = dayjs().hour(get().baseSettings.firstPuffHour).minute(0).second(0)
            const lastPuff = dayjs().hour(get().baseSettings.lastPuffHour).minute(0).second(0)
            const interval = lastPuff.diff(firstPuff) / (get().baseSettings.dailyPuffs - 1)

            // check if daily data exists for yesterday, otherwise today is the first day
            const yesterday = dayjs().subtract(1, 'day').format('YYYYMMDD')
            const yesterdayData = get().dailyData[yesterday]
            if(yesterdayData) {
                // check if yesterday puffs are less or equal than base settings daily puffs
                    const intervalIncrement = yesterdayData.puffs <= get().baseSettings.dailyPuffs
                        ? yesterdayData.intervalIncrement + get().baseSettings.intervalIncrement
                        : yesterdayData.intervalIncrement
                // TODO: filter out intervals that fall in the next day
                    const dailyIntervals = Array.from({ length: get().baseSettings.dailyPuffs }, (_, i) => firstPuff.add((interval * i) + (intervalIncrement * 60 * 1000), 'millisecond').toDate())
                    set(produce((state) => {
                        state.dailyData[key] = {
                            puffs: 0,
                            intervals: dailyIntervals,
                            intervalIncrement: intervalIncrement
                        }
                    }))
                    return dailyIntervals
            }
            const baseIntervalIncrement = get().baseSettings.intervalIncrement
            const dailyIntervals = Array.from({ length: get().baseSettings.dailyPuffs }, (_, i) => firstPuff.add((interval * i) + (get().baseSettings.intervalIncrement * 60 * 1000), 'millisecond').toDate())
            set(produce((state) => {
                state.dailyData[key] = {
                    puffs: 0,
                    intervals: dailyIntervals,
                    intervalIncrement: baseIntervalIncrement
                }
            }))
            return dailyIntervals
        },
        setDailyPuffs: (puffs: number) => set(produce((state) => state.baseSettings.dailyPuffs = puffs)),
        setFirstPuffHour: (hour: number) => set(produce((state) => state.baseSettings.firstPuffHour = hour)),
        setLastPuffHour: (hour: number) => set(produce((state) => state.baseSettings.lastPuffHour = hour)),
        incrementDailyPuffsCount: () => set(produce((state) => {
            const key = dayjs().format('YYYYMMDD')
            state.dailyData[key].puffs++
        })),
        getNextPuffTime: () => {
            const key = dayjs().format('YYYYMMDD')
            const intervals = get().getPuffIntervals()
            return intervals.slice(get().dailyData[key]?.puffs ?? 0).find(interval => dayjs(interval).isAfter(dayjs())) ?? intervals[0]
        },
        reset: () => set(defaultState),
    }),
    {
        name: "puff-storage",
        storage: createJSONStorage(() => AsyncStorage)
    }
))