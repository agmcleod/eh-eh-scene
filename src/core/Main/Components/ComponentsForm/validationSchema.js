import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test('isUnique', 'component name should be unique', function(value) {
      const { components } = this.parent
      return !components.find(c => c.name.toLowerCase() === value.toLowerCase())
    }),
  fields: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Field name is required'),
      type: yup.string().required('Field type is required')
    })
  )
})
