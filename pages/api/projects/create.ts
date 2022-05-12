import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectType } from '../../../common/types/ProjectType'
import { prisma } from '../../../common/lib/prisma'
import ObjectID from 'bson-objectid'
import { apiYupValidation } from '../../../common/hooks/useYupValidationResolver'
import projectSchema from '../../../common/utils/validations/projectSchema'
import _ from 'lodash'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectType
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const project = req.body

  if (!project) {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  try {
    //validate form
    const validate = await apiYupValidation<ProjectType>(projectSchema, project)

    if (!_.isEmpty(validate.errors)) {
      return res.json({ validationErrors: validate.errors })
    }

    const createdProject = await prisma.project.create({
      data: {
        ...project,
        id: ObjectID().toHexString(),
      },
    })

    res.json({ data: createdProject })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
