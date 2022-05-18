import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../common/types/TaskType'
import { prisma } from '../../../common/lib/prisma'
import { isValid } from 'date-fns'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: TaskType[]; error?: Error | unknown }>
) => {
  const { d } = req.query

  console.log('query', d)

  if (!d || typeof d !== 'string' || !isValid(new Date(d))) {
    return res.json({ error: 'Invalid date' })
  }

  const startDate = new Date(d)

  try {
    const tasks = await prisma.task.findMany({
      // where: { startDate },
      take: 5,
      include: { project: { select: { title: true, color: true } } },
    })

    console.log('prisma req', tasks)

    return res.status(200).json({ data: tasks })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
