import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test('isUnique', 'entity definition name should be unique', function(
      value
    ) {
      const { entityDefinitions } = this.parent
      return !entityDefinitions.find(
        ed => ed.name.toLowerCase() === value.toLowerCase()
      )
    }),
  components: yup.array().of(
    yup.object().shape({
      component: yup.string().required('Must select a component')
    })
  ),
  hasShape: yup.bool()
})
