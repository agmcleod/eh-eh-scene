import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import SelectMaterial from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export const Select = ({ label, name, onChange, options, value }) => (
  <>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <SelectMaterial inputProps={{ id: name, name }} onChange={onChange}>
      <MenuItem value=''>Select value</MenuItem>
      {options.map(opt => (
        <MenuItem value={opt.value}>{opt.label}</MenuItem>
      ))}
    </SelectMaterial>
  </>
)

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired
}
