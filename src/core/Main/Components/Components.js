import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import { TopActionButton } from 'common/components/TopActionButton'
import { H3 } from 'common/components/Header'
import { ListItem } from 'common/components/ListItem'
import { FIELD_TYPE_DETAILS } from 'common/constants'
import { ComponentsForm } from './ComponentsForm'

export const Components = ({ components }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editComponentIndex, setEditComponentIndex] = useState(undefined)

  return (
    <>
      <TopActionButton
        onClick={() => {
          setEditComponentIndex(undefined)
          setCreateDialogOpen(true)
        }}
      >
        Create New Component
      </TopActionButton>
      <div>
        {components.map((c, i) => {
          return (
            <ListItem key={c.name}>
              <H3>
                {c.name}{' '}
                <Button
                  onClick={() => {
                    setEditComponentIndex(i)
                    setCreateDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
              </H3>
              <table>
                <thead>
                  <tr>
                    <th>Field Name</th>
                    <th>Field Type</th>
                  </tr>
                </thead>
                <tbody>
                  {c.fields.map(field => (
                    <tr key={field.name}>
                      <td>{field.name}</td>
                      <td>{FIELD_TYPE_DETAILS[field.type].name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ListItem>
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
