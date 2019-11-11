import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Formik, FieldArray } from 'formik'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import { FIELD_TYPES } from 'common/constants'
import { Select } from 'common/components/Select'
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
          addComponent(values)
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
                          <React.Fragment key={i}>
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
                              options={[
                                {
                                  label: FIELD_TYPES.array_frame_name,
                                  value: 'array<frame>'
                                },
                                {
                                  label: FIELD_TYPES.array_number,
                                  value: 'array<number>'
                                },
                                {
                                  label: FIELD_TYPES.array_string,
                                  value: 'array<string>'
                                },
                                { label: FIELD_TYPES.boolean, value: 'bool' },
                                {
                                  label: FIELD_TYPES.frame_name,
                                  value: 'frame'
                                },
                                { label: FIELD_TYPES.number, value: 'number' },
                                { label: FIELD_TYPES.string, value: 'string' }
                              ]}
                              value={values[`fields[${i}].type`]}
                            />
                          </React.Fragment>
                        )
                      })}
                      <Button
                        onClick={() =>
                          fieldsArrayHelper.push({ name: '', type: '' })
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
