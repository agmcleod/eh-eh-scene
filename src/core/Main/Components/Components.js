import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { ComponentsForm } from './ComponentsForm'

export const Components = ({ components, setComponent }) => {
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
        <ComponentsForm setCreateDialogOpen={setCreateDialogOpen} />
      </Dialog>
    </>
  )
}

Components.propTypes = {
  components: PropTypes.array.isRequired,
  setComponent: PropTypes.func.isRequired
}
