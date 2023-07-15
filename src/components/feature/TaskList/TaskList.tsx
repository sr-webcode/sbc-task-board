import { Spinner, Text, VStack } from "@chakra-ui/react"

import TaskListItem from './TaskListItem'
import { displayNonData } from '@/utils/render'
import { useAppSelector } from '@/redux/store'

const TaskList = () => {
    const { error, loading, tasks, searchTerm } = useAppSelector((state) => state.tasks)
    let filteredTasks = searchTerm ? tasks.filter(({ title }) => title.toLowerCase().includes(searchTerm)) : tasks

    if (error) { return displayNonData(<Text color="GrayText">{error}</Text>) }
    if (loading) {
        return displayNonData(<Spinner
            size='lg'
            speed='0.65s'
            color='purple'
            thickness='4px'
            emptyColor='gray.300'
        />)
    }
    if (filteredTasks.length < 1) {
        return displayNonData(
            <Text color="GrayText" textAlign="center">
                No tasks to display.</Text>
        )
    }

    return (
        <VStack width="100%">
            {filteredTasks.map((taskDetails) => (
                <TaskListItem
                    {...taskDetails}
                    key={taskDetails._id}
                />
            ))}
        </VStack>
    )
}



export default TaskList