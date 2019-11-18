import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { H3 } from 'common/components/Header'
import { ListItem } from 'common/components/ListItem'
import { TopActionButton } from 'common/components/TopActionButton'
import { EntityDefinitionsForm } from './EntityDefinitionsForm'

export const EntityDefinitions = ({ entityDefinitions }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editEntityDefinitionIndex, setEditEntityDefinitionIndex] = useState(
    undefined
  )

  return (
    <>
      <TopActionButton
        onClick={() => {
          setEditEntityDefinitionIndex(undefined)
          setCreateDialogOpen(true)
        }}
      >
        Create New Entity Defintion
      </TopActionButton>
      <div>
        {entityDefinitions.map((ed, i) => {
          return (
            <ListItem key={i}>
              <H3>
                {ed.name}
                <Button
                  onClick={() => {
                    setEditEntityDefinitionIndex(i)
                    setCreateDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
              </H3>
            </ListItem>
          )
        })}
      </div>
      <Dialog open={createDialogOpen} aria-labelledby='create-component-form'>
        <DialogTitle id='create-component-form'>
          Create New Component
        </DialogTitle>
        <EntityDefinitionsForm
          editIndex={editEntityDefinitionIndex}
          setCreateDialogOpen={setCreateDialogOpen}
        />
      </Dialog>
    </>
  )
}

EntityDefinitions.propTypes = {
  entityDefinitions: PropTypes.array.isRequired
}
