import { ChangeEventHandler } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { IconButton, Select, HStack, Text, ComponentWithAs } from '@chakra-ui/react'

import { TFilterValue } from '@/types/task'
import { SORT_FILTER_OPTIONS } from '@/config/select'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { changeFilterValue, changeFilterOrder } from '@/redux/slices/tasksSlice'


const Filters = () => {
    const dispatch = useAppDispatch()
    const { sortFilter } = useAppSelector((state) => state.tasks)
    const isSortOrderUp = sortFilter.order === 'up';
    const ArrowIcon: ComponentWithAs<"svg", {}> = isSortOrderUp ? ArrowUpIcon : ArrowDownIcon

    const onFilterValueChange: ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
        const filterValue = (value.length > 0 ? value : null) as TFilterValue
        dispatch(changeFilterValue(filterValue))
        dispatch(changeFilterOrder(sortFilter.order))
    }

    const onFilterOrderChange = () => {
        const newFilterOrder = isSortOrderUp ? 'down' : 'up'
        dispatch(changeFilterOrder(newFilterOrder))
    }
    return (
        <HStack>
            <Text fontSize="sm" flexShrink={0} >Sort by:</Text>
            <Select defaultValue="Title" onChange={onFilterValueChange} bgColor="white" size="sm" borderRadius={6}>
                {SORT_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
            </Select>
            <IconButton
                size="sm"
                variant="ghost"
                fontSize="lg"
                aria-label='Filter Up'
                icon={<ArrowIcon />}
                onClick={onFilterOrderChange}
            />
        </HStack >

    )
}

export default Filters