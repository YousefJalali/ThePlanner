import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectWithTasksType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'
import { projectsKey } from './keys'

type ProjectWithTasksCount = ProjectWithTasksType & {
  _count: { tasks: number }
}

const useRecentProjects = () => {
  const key = `${projectsKey()}?limit=4`

  const { data, error, mutate } = useSWR(key, customFetch, {
    use: [requestLogger],
  })

  const projects: ProjectWithTasksCount[] = data?.data || []
  const isLoading = !error && !data
  const setProjects = mutate

  return { projects, setProjects, error: getErrorMessage(error), isLoading }
}

export default useRecentProjects
