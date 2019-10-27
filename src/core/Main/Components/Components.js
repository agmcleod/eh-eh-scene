import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, FieldArray } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { Select } from 'common/components/Select'
import { validationSchema } from './validationSchema'

const initialValues = {
  name: '',
  fields: []
}

export const Components = ({ components }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={() => setCreateDialogOpen(true)}
      >
        Create New Component
      </Button>
      <Grid>
        {components.map(c => {
          return (
            <div key={c.name}>
              <h3>{c.name}</h3>
            </div>
          )
        })}
      </Grid>
      <Dialog open={createDialogOpen} aria-labelledby='create-component-form'>
        <DialogTitle id='create-component-form'>
          Create New Component
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          render={({ handleSubmit, values }) => {
            return (
              <>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Name'
                    type='text'
                    fullWidth
                  />
                  <FieldArray
                    name='fields'
                    render={fieldsArrayHelper => {
                      return (
                        <>
                          {values.fields.map((_, i) => {
                            return (
                              <React.Fragment key={i}>
                                <TextField
                                  name={`fields[${i}].name`}
                                  id={`fields[${i}].name`}
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
                        </>
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
      </Dialog>
    </>
  )
}

Components.propTypes = {
  components: PropTypes.array.isRequired
}
