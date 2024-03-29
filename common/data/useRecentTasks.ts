import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProjectType } from '../types/TaskType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'

const useRecentTasks = () => {
  const res = useSWR('/api/tasks/recent', customFetch, {
    use: [requestLogger],
  })

  const { data, error, mutate } = res

  const recentTasks: TaskWithProjectType[] = data?.data || []
  const isLoading = !data && !error
  const errorMessage = getErrorMessage(error)

  return { recentTasks, error: errorMessage, isLoading, mutate }
}

export default useRecentTasks
