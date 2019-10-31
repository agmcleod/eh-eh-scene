import React from 'react'
import PropTypes from 'prop-types'
import { Formik, FieldArray } from 'formik'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import { Select } from 'common/components/Select'
import { TextField } from 'common/components/TextField'
import { validationSchema } from './validationSchema'

const initialValues = {
  name: '',
  fields: []
}

export const ComponentsForm = ({ setCreateDialogOpen, setComponent }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      setComponent(values)
      setSubmitting(false)
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
                              { label: 'array', value: 'array' },
                              { label: 'bool', value: 'bool' },
                              { label: 'number', value: 'number' },
                              { label: 'string', value: 'string' }
                            ]}
                            value={values[`fields[${i}].type`]}
                          />
                        </React.Fragment>
                      )
                    })}
                    <Button
                      onClick={() =>
                        fieldsArrayHelper.push([{ name: '', type: '' }])
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
            <Button onClick={() => setCreateDialogOpen(false)} color='primary'>
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

ComponentsForm.propTypes = {
  setCreateDialogOpen: PropTypes.func.isRequired,
  setComponent: PropTypes.func.isRequired
}
