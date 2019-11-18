import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { ArrayFieldWrapper } from 'common/components/ArrayFieldWrapper'
import { Select } from 'common/components/Select'

export const ComponentSelect = ({
  components,
  fieldPath,
  currentComponent,
  setFieldValue
}) => {
  useEffect(() => {
    if (currentComponent) {
      setFieldValue(
        `${fieldPath}.fieldValues`,
        components
          .find(c => c.uuid === currentComponent)
          .fields.reduce((obj, field) => {
            obj[field.uuid] = {
              field,
              allowOverride: false,
              value: ''
            }
            return obj
          }, {})
      )
    }
  }, [components, currentComponent, fieldPath, setFieldValue])

  return (
    <ArrayFieldWrapper key={fieldPath}>
      <Select
        id={`${fieldPath}.component`}
        label='Component'
        name={`${fieldPath}.component`}
        options={components.map(c => ({
          label: c.name,
          value: c.uuid
        }))}
      />
    </ArrayFieldWrapper>
  )
}

ComponentSelect.propTypes = {
  components: PropTypes.array.isRequired,
  fieldPath: PropTypes.string.isRequired,
  currentComponent: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired
}
