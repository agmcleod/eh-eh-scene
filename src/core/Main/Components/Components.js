import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import { ComponentsForm } from './ComponentsForm'

export const Components = ({ components }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editComponentIndex, setEditComponentIndex] = useState(undefined)

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          setEditComponentIndex(undefined)
          setCreateDialogOpen(true)
        }}
      >
        Create New Component
      </Button>
      <div>
        {components.map((c, i) => {
          return (
            <div key={c.name}>
              <h3>
                {c.name}{' '}
                <Button
                  onClick={() => {
                    setEditComponentIndex(i)
                    setCreateDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
              </h3>
              <table>
                <tbody>
                  {c.fields.map(field => (
                    <tr key={field.name}>
                      <td>{field.name}</td>
                      <td>{field.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
      <Dialog open={createDialogOpen} aria-labelledby='create-component-form'>
        <DialogTitle id='create-component-form'>
          Create New Component
        </DialogTitle>
        <ComponentsForm
          editIndex={editComponentIndex}
          setCreateDialogOpen={setCreateDialogOpen}
        />
      </Dialog>
    </>
  )
}

Components.propTypes = {
  components: PropTypes.array.isRequired
}
