import { ChangeEventHandler, useEffect } from 'react'
import { Button, Container, Flex, Heading, Input, VStack } from '@chakra-ui/react'

import Filters from './components/feature/Filters'
import TaskList from './components/feature/TaskList'
import FormModal from './components/feature/FormModal'
import { useAppDispatch } from '@/redux/store'
import { toggleModal } from '@/redux/slices/formSlice'
import { fetchTasks, searchTask } from '@/redux/slices/tasksSlice'

function App() {
  let searchTimeOut: ReturnType<typeof setTimeout>;
  const dispatch = useAppDispatch()
  const onToggleModal = () => dispatch(toggleModal({ action: 'add' }))
  const onSearchTask: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    clearInterval(searchTimeOut)
    searchTimeOut = setTimeout(() => {
      const searchTerm = target.value.trim().toLowerCase()
      dispatch(searchTask(searchTerm))
    }, 800);
  }

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  return (
    <Container maxW="container.lg" py={16}>
      <Flex mb={6} width="100%" justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg">
          Todo(s)
        </Heading>
        <Button
          px={6}
          size="md"
          borderRadius={10}
          colorScheme="purple"
          onClick={onToggleModal}
        >
          Add Todo
        </Button>
      </Flex>
      <VStack spacing={5} alignItems="flex-start">
        <Input onChange={onSearchTask} bgColor="white" placeholder='Search...' size='md' borderRadius={12} />
        <Filters />
        <TaskList />
      </VStack>
      <FormModal />
    </Container>
  )
}

export default App