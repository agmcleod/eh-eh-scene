import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  fields: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Field name is required'),
      type: yup.string().required('Field type is required')
    })
  )
})
