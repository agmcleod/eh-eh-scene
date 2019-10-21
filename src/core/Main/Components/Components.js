import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const initialValues = {
  name: ''
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
          render={({ handleSubmit }) => {
            return (
              <>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Email Address'
                    type='email'
                    fullWidth
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
                    create
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
