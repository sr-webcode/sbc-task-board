import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Portal, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, ModalBody, Button, VStack } from '@chakra-ui/react'

import useNotification from '@/hooks/useNotification'
import { ITaskItem } from '@/types/task'
import { THookFormState } from '@/types/formModal'
import { AddEditFields, DeleteFields } from './FieldControl'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { toggleModal, addTask, deleteTask, updateTask } from '@/redux/slices/formSlice'


const FormModal = () => {
    const dispatch = useAppDispatch()
    const { successNotify, errorNotify } = useNotification()
    const { isOpen, action, loading, selectorData } = useAppSelector((state) => state.form)
    const onToggleModal = () => dispatch(toggleModal())
    const { handleSubmit, formState, register, control, reset } = useForm<THookFormState>({})
    const isDeleteMode = action === 'delete';
    const buttonText = isDeleteMode ? 'Delete Record' : 'Submit'
    const buttonMaxWidth = isDeleteMode ? 400 : 640
    const hasDirtyFields = Object.keys(formState.dirtyFields).length > 0;

    const onFormSubmit: SubmitHandler<THookFormState> = (values) => {
        switch (action) {
            case "add":
                dispatch(addTask(values as Omit<ITaskItem, "_id">))
                    .then(() => successNotify('New task added'))
                    .catch((err) => errorNotify(err?.message ?? 'New task failed'))
                break;
            case "edit":
                // formState.isDirty has weird comparison issue            
                if (!hasDirtyFields) return
                dispatch(updateTask(values as ITaskItem))
                    .then(() => successNotify('Task updated'))
                    .catch((err) => errorNotify(err?.message ?? 'Task update failed'))
                break;
            case "delete":
                if (values._id) dispatch(deleteTask(values._id)).then(() => successNotify('Task deleted'))
                    .catch((err) => errorNotify(err?.message ?? 'Task delete failed'))
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        reset(selectorData ? selectorData : {})
    }, [isOpen])

    return (
        <Portal>
            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onToggleModal}
            >
                <ModalOverlay
                    bg='whiteAlpha.800'
                    backdropFilter='auto'
                />
                <ModalContent
                    borderRadius={4}
                    maxW={buttonMaxWidth}
                    boxShadow="0 4px 8px rgba(0,0,0,0.25)">
                    <ModalHeader>Todo Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <VStack spacing={4}>
                                {isDeleteMode ? (
                                    <DeleteFields
                                        register={register}
                                        formState={formState} />
                                ) : <AddEditFields
                                    control={control}
                                    register={register}
                                    formState={formState}
                                />}
                                <Button
                                    type='submit'
                                    isLoading={loading}
                                    loadingText="Submit"
                                    colorScheme='red'
                                    borderRadius={4}>
                                    {buttonText}
                                </Button>
                            </VStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Portal>
    )
}

export default FormModal