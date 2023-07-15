import { Box, Badge, IconButton, Text, CircularProgress, Grid, GridItem, HStack } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import { ITaskItem } from '@/types/task'
import { useAppDispatch } from '@/redux/store'
import { getStatusColor } from '@/utils/color'
import { toggleModal } from '@/redux/slices/formSlice'

const TaskItem = ({ priority, progress, status, title, _id }: ITaskItem) => {
    const dispatch = useAppDispatch()
    const priorityTextColor = getStatusColor(priority)
    const badgeTextColor = getStatusColor(status)
    const onDeleteTaskItem = () => dispatch(toggleModal({ action: 'delete', _id }))
    const onEditTaskItem = () => dispatch(toggleModal({ action: 'edit', record: { _id, title, priority, status, progress } }))

    return (
        <Box w="100%" p={4} borderRadius={20} bg="white">
            <Grid templateColumns='repeat(5, 1fr)' alignItems="center" gap={6}>
                <GridItem >
                    <Text color="gray.400">Todo</Text>
                    <Text as="b">{title}</Text>
                </GridItem>
                <GridItem >
                    <Text color="gray.400" >Priority</Text>
                    <Text color={priorityTextColor} textTransform="capitalize">{priority}</Text>
                </GridItem>
                <GridItem>
                    <Badge color={badgeTextColor} fontWeight="normal" fontSize="md" textTransform="capitalize" p={2} px={5} borderRadius={8} >{status}</Badge>
                </GridItem>
                <GridItem>
                    <CircularProgress color="#6E0EE3" value={progress} size='28px' thickness='12px' />
                </GridItem>
                <GridItem>
                    <HStack spacing={3}>
                        <IconButton
                            size="sm"
                            variant="ghost"
                            fontSize="lg"
                            color="gray.800"
                            icon={<EditIcon />}
                            aria-label='Edit Record'
                            onClick={onEditTaskItem}
                        />
                        <IconButton
                            size="sm"
                            fontSize="lg"
                            color="red.400"
                            variant="ghost"
                            icon={<DeleteIcon />}
                            aria-label='Delete Record'
                            onClick={onDeleteTaskItem}
                        />
                    </HStack>
                </GridItem>
            </Grid>
        </Box>
    )
}


export default TaskItem