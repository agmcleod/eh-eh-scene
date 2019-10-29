import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import SelectMaterial from '@material-ui/core/Select'

import { Wrapper } from './styledComponents'

export const Select = ({ label, name, options }) => (
  <Field name={name}>
    {({ field }) => (
      <Wrapper>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <SelectMaterial
          inputProps={{ id: name, name }}
          onChange={field.onChange}
          fullWidth
          value={field.value}
        >
          <MenuItem value=''>Select value</MenuItem>
          {options.map(opt => (
            <MenuItem value={opt.value}>{opt.label}</MenuItem>
          ))}
        </SelectMaterial>
      </Wrapper>
    )}
  </Field>
)

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
}
