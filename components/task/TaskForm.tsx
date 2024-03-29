import ObjectID from 'bson-objectid'
import { x } from '@xstyled/styled-components'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash'
import { parseISO } from 'date-fns'
import { useEffect, useMemo } from 'react'

import Input from '../formElements/Input'
import DatePicker from '../formElements/DatePicker'
import SelectProject from '../project/SelectProject'
import TextEditor from '../formElements/TextEditor'
import SwitchButton from '../formElements/SwitchButton'
import ImageInput from '../formElements/ImageInput'
import Fieldset from '../formElements/Fieldset'
import Button from '../formElements/Button'
import Form from '../form/Form'

import taskSchema from '../../common/utils/validations/taskSchema'
import useYupValidationResolver from '../../common/hooks/useYupValidationResolver'

import {
  TaskType,
  Status,
  TaskWithProjectType,
} from '../../common/types/TaskType'
import addServerErrors from '../../common/utils/addServerErrors'
import {
  addCurrentTime,
  dateFormatPattern,
} from '../../common/utils/dateHelpers'

type Props = {
  id: 'create' | 'edit'
  title?: string
  defaultValues?: Partial<TaskType>
  onSubmit: (data: TaskType) => void
  isSubmitting?: boolean
  onRequestClose?: () => void
  serverErrors?: object
}

const stringToDate: (date: string | Date) => Date = (date) =>
  typeof date === 'string' ? parseISO(date) : date

export const initialDefaultValues: TaskType | TaskWithProjectType = {
  id: ObjectID().toHexString(),
  title: '',
  projectId: '',
  openTask: true,
  startDate: new Date(),
  endDate: null,
  startTime: null,
  endTime: null,
  description: '',
  attachments: [],
  status: Status.PROPOSED,
  createdAt: new Date(),
  updatedAt: new Date(),
}

function TaskForm({
  id,
  title,
  defaultValues = {},
  onSubmit,
  isSubmitting = false,
  onRequestClose,
  serverErrors,
}: Props) {
  const formName = 'task-form'

  let defValues = {
    ...initialDefaultValues,
    ...defaultValues,
  }

  defValues = {
    ...defValues,
    startDate: stringToDate(defValues.startDate),
    endDate: defValues.endDate && stringToDate(defValues.endDate),
    startTime: defValues.startTime && stringToDate(defValues.startTime),
    endTime: defValues.endTime && stringToDate(defValues.endTime),
  }

  const resolver = useYupValidationResolver<TaskType | TaskWithProjectType>(
    taskSchema
  )
  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors, isDirty },
    getValues,
    resetField,
    clearErrors,
    setValue,
  } = useForm<TaskType | TaskWithProjectType>({
    defaultValues: defValues,
    resolver,
  })

  useEffect(() => {
    if (serverErrors) {
      addServerErrors(serverErrors, setError)
    }
    return () => {
      clearErrors()
    }
  }, [serverErrors])

  const onSubmitHandler = async (data: TaskWithProjectType) => {
    const startDate = addCurrentTime(data.startDate)
    const endDate = data.endDate ? addCurrentTime(data.endDate) : null

    const formData = {
      ...data,
      startDate,
      endDate,
    }

    onSubmit(formData)
  }

  const dateErrors = useMemo(
    () => _.compact([_.get(errors, 'endDate'), _.get(errors, 'endTime')]),
    [errors]
  )

  const onOpenTaskHandler = (checked: boolean) => {
    if (checked) {
      resetField('endDate')
      resetField('startTime')
      resetField('endTime')
    }
  }

  return (
    <>
      <Form
        id={id}
        name={formName}
        title={title}
        isSubmitting={isSubmitting}
        onRequestClose={onRequestClose}
        onSubmit={handleSubmit(onSubmitHandler)}
        isDirty={isDirty}
      >
        {/* Title */}
        <Controller
          name='title'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Fieldset
                id={`${formName}-title`}
                label='Task title'
                error={error}
              >
                <Input
                  id={`${formName}-title`}
                  type='text'
                  placeholder='i.e. speakers'
                  value={value}
                  onChange={onChange}
                />
              </Fieldset>
            )
          }}
        />

        {/* Project */}
        <Controller
          name='projectId'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            // const v = _.isObject(value) ? value.id : value

            return (
              <Fieldset
                id={`${formName}-project`}
                label='Project'
                error={error}
              >
                <SelectProject
                  inputId={`${formName}-project`}
                  value={value}
                  onChange={onChange}
                  taskProject={(project) => setValue('project', project)}
                  placeholder='Select a project'
                />
              </Fieldset>
            )
          }}
        />

        {/* Date */}
        <Fieldset
          noBorder
          error={dateErrors}
          supportiveText='End date & end time are optional'
        >
          <>
            <x.div
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={1}
            >
              <x.span>Date & Time</x.span>
              <x.div display='flex' alignItems='center'>
                <x.span mr={2}>Open task?</x.span>

                <Controller
                  name='openTask'
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <SwitchButton
                        id={`${formName}-openTask`}
                        height={24}
                        checked={value}
                        onChange={(e) => {
                          onChange(e.target.checked)
                          onOpenTaskHandler(e.target.checked)
                        }}
                      />
                    )
                  }}
                />
              </x.div>
            </x.div>

            {/* Start Date */}
            <x.div display='flex'>
              <x.div flex='0 0 calc(100% - 8px - 85px)'>
                <Controller
                  name='startDate'
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Fieldset
                        id={`${formName}-startDate`}
                        error={error}
                        noErrorMessage
                        label='from'
                      >
                        <DatePicker
                          id={`${formName}-startDate`}
                          dataTestId='task-form-start-date'
                          selectsStart
                          selected={value}
                          onChange={onChange}
                          startDate={value}
                          endDate={getValues('endDate')}
                          popperPlacement='bottom-start'
                          placeholderText='Click to select a date'
                          dateFormat={dateFormatPattern(value)}
                        />
                      </Fieldset>
                    )
                  }}
                />
              </x.div>

              {/* Start Time */}
              <x.div w={85} ml={2} mt='calc((0.889rem * 1.5) + 0.25rem)'>
                <Controller
                  name='startTime'
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Fieldset
                        id={`${formName}-startTime`}
                        error={error}
                        noErrorMessage
                        disabled={watch('openTask')}
                      >
                        <DatePicker
                          id={`${formName}-startTime`}
                          dataTestId='task-form-start-time'
                          selected={value}
                          onChange={onChange}
                          disabled={watch('openTask')}
                          popperPlacement='bottom-end'
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={30}
                          timeCaption=''
                          dateFormat='h:mm aa'
                          placeholderText='hh:mm'
                        />
                      </Fieldset>
                    )
                  }}
                />
              </x.div>
            </x.div>

            {/* End Date */}
            <x.div display='flex' mt={3}>
              <x.div flex='0 0 calc(100% - 8px - 85px)'>
                <Controller
                  name='endDate'
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Fieldset
                        id={`${formName}-endDate`}
                        label='To'
                        disabled={watch('openTask')}
                        error={error}
                        noErrorMessage
                        optionalField
                      >
                        <DatePicker
                          id={`${formName}-endDate`}
                          dataTestId='task-form-end-date'
                          selectsEnd
                          selected={value}
                          onChange={onChange}
                          startDate={getValues('startDate')}
                          endDate={value}
                          minDate={getValues('startDate')}
                          disabled={watch('openTask')}
                          popperPlacement='bottom-start'
                          placeholderText='Due date'
                          dateFormat={
                            value ? dateFormatPattern(value) : undefined
                          }
                        />
                      </Fieldset>
                    )
                  }}
                />
              </x.div>

              {/* End Time */}
              <x.div w={85} ml={2} mt='calc((0.889rem * 1.5) + 0.25rem)'>
                <Controller
                  name='endTime'
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Fieldset
                        id={`${formName}-endTime`}
                        disabled={watch('openTask')}
                        error={error}
                        noErrorMessage
                      >
                        <DatePicker
                          id={`${formName}-endTime`}
                          dataTestId='task-form-end-time'
                          selected={value}
                          onChange={onChange}
                          disabled={watch('openTask')}
                          popperPlacement='bottom-end'
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={30}
                          timeCaption=''
                          dateFormat='h:mm aa'
                          placeholderText='hh:mm'
                        />
                      </Fieldset>
                    )
                  }}
                />
              </x.div>
            </x.div>
          </>
        </Fieldset>

        <Controller
          name='description'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Fieldset
                id={`${formName}-description`}
                label='description'
                error={error}
                optionalField
              >
                <TextEditor
                  id={`${formName}-description`}
                  value={value}
                  onChange={onChange}
                  placeholder='A brief about the task...'
                />
              </Fieldset>
            )
          }}
        />

        <Controller
          name='attachments'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Fieldset
                label='attachments'
                id={`${formName}-attachments`}
                error={error}
                supportiveText={`Photos • ${value.length}/10 `}
                noBorder
                optionalField
              >
                <ImageInput
                  id={`${formName}-attachments`}
                  value={value}
                  onChange={onChange}
                  max={10}
                  multiple
                />
              </Fieldset>
            )
          }}
        />

        <Button
          name='submit task'
          type='submit'
          position='sticky'
          zIndex={3}
          bottom={24}
          justifyContent='center'
          boxShadow={0}
          isLoading={isSubmitting}
          w='100%'
          size='large'
        >
          {id === 'edit' ? 'Update' : 'Create'}
        </Button>
      </Form>
    </>
  )
}

export default TaskForm
