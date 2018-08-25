import moment from 'moment'

export const isExpired = (dateStr) => moment(dateStr).isBefore(moment())
export const relativeTime = (dateStr) => moment(dateStr).fromNow()
