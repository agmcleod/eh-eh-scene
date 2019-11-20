import React from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'formik'
import get from 'lodash/get'

import { FIELD_TYPES, FIELD_TYPE_DETAILS } from 'common/constants'
import { TextField } from 'common/components/TextField'

export const ComponentFieldInput = ({ name, fieldType, values }) => {
  switch (fieldType) {
    case FIELD_TYPES.string:
      return <TextField name={name} label='Field Value' type='text' fullWidth />
    case FIELD_TYPES.number:
      return (
        <TextField name={name} label='Field Value' type='number' fullWidth />
      )
    case FIELD_TYPES.frame_name:
      return (
        <FieldArray
          name={name}
          render={fieldArrayHelpers =>
            get(values, name).map((_, i) => (
              <TextField
                key={i}
                name={`${name}[${i}]`}
                label='Field Value'
                type='number'
                fullWidth
              />
            ))
          }
        />
      )
    default:
      return null
  }
}

ComponentFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired
}
