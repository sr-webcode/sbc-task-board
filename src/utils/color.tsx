import { ColorProps } from '@chakra-ui/react'
import { TPriority, TStatus } from '@/types/task'

type TStatusColor<T extends string> = { [key in T]: ColorProps['textColor'] }
type TStatusParam = TStatus | TPriority

const STATUS_COLORS: TStatusColor<TStatusParam> = {
    high: 'red.400',
    low: 'green.400',
    medium: 'yellow.400',
    "in progress": 'blue.400',
    "to do": 'gray.400',
    done: 'green.400'
}

export const getStatusColor = (status: TStatusParam) => STATUS_COLORS[status]