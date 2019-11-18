import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Formik, FieldArray } from 'formik'
import uuid from 'uuid/v4'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import { FIELD_TYPES, FIELD_TYPE_DETAILS } from 'common/constants'
import { Select } from 'common/components/Select'
import { ArrayFieldWrapper } from 'common/components/ArrayFieldWrapper'
import { TextField } from 'common/components/TextField'
import { validationSchema } from './validationSchema'

export const ComponentsForm = ({
  components,
  editIndex,
  setCreateDialogOpen,
  addComponent,
  updateComponent
}) => {
  const initialValues = useMemo(() => {
    if (editIndex !== undefined) {
      const component = components[editIndex]
      return {
        components,
        ...component
      }
    }
    return { name: '', fields: [], components }
  }, [components, editIndex])
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        if (editIndex !== undefined) {
          updateComponent({ index: editIndex, component: values })
        } else {
          addComponent({ ...values, uuid: uuid() })
        }
        setSubmitting(false)
        setCreateDialogOpen(false)
      }}
      validationSchema={validationSchema}
      render={({ handleSubmit, values }) => {
        return (
          <>
            <DialogContent>
              <TextField name='name' label='Name' type='text' fullWidth />
              <FieldArray
                name='fields'
                render={fieldsArrayHelper => {
                  return (
                    <fieldset>
                      <legend>Fields</legend>
                      {values.fields.map((_, i) => {
                        return (
                          <ArrayFieldWrapper key={i}>
                            <TextField
                              name={`fields[${i}].name`}
                              label='Field Name'
                              type='text'
                              fullWidth
                            />
                            <Select
                              id={`fields[${i}].type`}
                              label='Field Type'
                              name={`fields[${i}].type`}
                              options={Object.values(FIELD_TYPES).map(type => ({
                                label: FIELD_TYPE_DETAILS[type].name,
                                value: type
                              }))}
                              value={values[`fields[${i}].type`]}
                            />
                          </ArrayFieldWrapper>
                        )
                      })}
                      <Button
                        onClick={() =>
                          fieldsArrayHelper.push({
                            uuid: uuid(),
                            name: '',
                            type: ''
                          })
                        }
                      >
                        Add Field
                      </Button>
                    </fieldset>
                  )
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setCreateDialogOpen(false)}
                color='primary'
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} color='primary'>
                Create
              </Button>
            </DialogActions>
          </>
        )
      }}
    />
  )
}

ComponentsForm.propTypes = {
  components: PropTypes.array.isRequired,
  addComponent: PropTypes.func.isRequired,
  editIndex: PropTypes.number,
  setCreateDialogOpen: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired
}
