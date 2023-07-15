import { PropsWithChildren } from 'react'
import { FormState, UseFormRegister, Controller, Control } from 'react-hook-form'
import {
    FormControl, FormLabel, FormErrorMessage, Input, Select,
    Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, SpaceProps
} from '@chakra-ui/react'

import { THookFormState } from '@/types/formModal'
import { PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from '@/config/select'

interface IFormProps {
    formState: FormState<THookFormState>
    register: UseFormRegister<THookFormState>
    control?: Control<THookFormState>
}

interface IFieldControlProps {
    label: string;
    space?: SpaceProps
    fieldError: string | undefined;
}


const FieldControl = ({ children, label, fieldError, space }: PropsWithChildren<IFieldControlProps>) => (
    <FormControl isInvalid={fieldError ? true : false} {...space}>
        <FormLabel>{label}</FormLabel>
        {children}
        {fieldError && (
            <FormErrorMessage>
                {fieldError}
            </FormErrorMessage>
        )}
    </FormControl>
)


export const AddEditFields = ({ register, formState, control }: IFormProps) => {
    const { errors } = formState
    return (
        <>
            <FieldControl
                label='Title'
                fieldError={errors.title?.message}
            >
                <Input
                    {...register('title', {
                        required: 'Field is required',
                    })}
                    placeholder='Enter Task Title'
                />
            </FieldControl>
            <FieldControl label='Priority' fieldError={errors.priority?.message}>
                <Select
                    {...register('priority', {
                        required: 'Field is required',
                    })}
                    placeholder='Select Priority...'
                >
                    {PRIORITY_OPTIONS.map((o) => (
                        <option style={{ textTransform: 'capitalize' }} key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </Select>
            </FieldControl>
            <FieldControl label='Status' fieldError={errors.status?.message}>
                <Select
                    {...register('status', {
                        required: 'Field is required',
                    })}
                    placeholder='Select Status...'>
                    {TASK_STATUS_OPTIONS.map((o) => (
                        <option style={{ textTransform: 'capitalize' }} key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </Select>
            </FieldControl>
            {/* unable to use register on progress due to prop issue */}
            <FieldControl label="Progress" fieldError={undefined} space={{ mb: 4 }}>
                <Controller
                    name="progress"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                        <Slider
                            min={0}
                            max={100}
                            {...field}
                        >
                            <SliderMark
                                value={field.value ?? 0}
                                textAlign='center'
                                bg='blue.500'
                                color='white'
                                mt='3'
                                w='10'
                                ml='-5'
                                zIndex={99}
                                borderRadius={4}
                            >
                                {field.value}%
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    )}
                />
            </FieldControl>
        </>
    )
}


export const DeleteFields = ({ register }: IFormProps) => (
    <FieldControl
        label='Delete Record Id?'
        fieldError={undefined}
    >
        <Input
            readOnly
            bgColor="gray.100"
            {...register('_id', {
            })}
        />
    </FieldControl>
)


