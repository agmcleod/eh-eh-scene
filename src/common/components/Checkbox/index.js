import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckboxBase from '@material-ui/core/Checkbox'

export const Checkbox = ({ label, name, ...props }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControlLabel
            control={
              <CheckboxBase
                {...props}
                onChange={field.onChange}
                checked={field.value}
              />
            }
            label={label}
          />
        )
      }}
    </Field>
  )
}

Checkbox.defaultProps = {
  color: 'primary'
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
