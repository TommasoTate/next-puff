import dayjs from 'dayjs'

const DAILY_PUFFS = 12
const FIRST_PUFF_DATE = dayjs().startOf('day').add(8, 'hour').toDate()
const LAST_PUFF_DATE = dayjs().startOf('day').add(23, 'hour').toDate()

// puff interval in milliseconds between each puff starting from FIRST_PUFF_DATE to LAST_PUFF_DATE
const PUFF_INTERVAL = dayjs(LAST_PUFF_DATE).diff(FIRST_PUFF_DATE) / DAILY_PUFFS

export const getPuffInterval = () =>  PUFF_INTERVAL