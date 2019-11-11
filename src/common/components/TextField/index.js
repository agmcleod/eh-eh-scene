import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import get from 'lodash/get'
import TextFieldMaterial from '@material-ui/core/TextField'

export const TextField = ({ label, name, ...props }) => (
  <Field name={name}>
    {({ field, form }) => {
      const error = get(form.errors, field.name, '')
      const hasError = form.submitCount > 0 && Boolean(error)
      return (
        <TextFieldMaterial
          id={name}
          error={hasError}
          label={label}
          onChange={field.onChange}
          fullWidth
          value={field.value}
          helperText={hasError ? error : ''}
          {...props}
        />
      )
    }}
  </Field>
)

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
