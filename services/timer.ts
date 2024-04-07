import dayjs from 'dayjs'


export const getPuffInterval = (firstPuffHour: number, LastPuffHour: number, dailyPuffs: number) =>  {
    if (firstPuffHour > LastPuffHour) {
        throw new Error('First puff hour must be less than last puff hour')
    }
    const firstPuff = dayjs().hour(firstPuffHour).minute(0).second(0)
    const lastPuff = dayjs().hour(LastPuffHour).minute(0).second(0)
    return lastPuff.diff(firstPuff, 'minute') / dailyPuffs
}