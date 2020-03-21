import dayjs from 'dayjs'

export const formatDateTime = timestamp => dayjs.unix(timestamp).format('DD/MM/YYYY H:mm:ss')
