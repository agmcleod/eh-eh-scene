import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import TextFieldMaterial from '@material-ui/core/TextField'

export const TextField = ({ label, name, ...props }) => (
  <Field name={name}>
    {({ field }) => (
      <TextFieldMaterial
        id={name}
        label={label}
        onChange={field.onChange}
        fullWidth
        value={field.value}
        {...props}
      />
    )}
  </Field>
)

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
