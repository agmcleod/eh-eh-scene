import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Formik, FieldArray } from 'formik'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import { ArrayFieldWrapper } from 'common/components/ArrayFieldWrapper'
import { Select } from 'common/components/Select'
import { TextField } from 'common/components/TextField'

export const EntityDefinitionsForm = ({
  components,
  entityDefinitions,
  editIndex,
  setCreateDialogOpen,
  addEntityDefinition,
  updateEntityDefinition
}) => {
  const initialValues = useMemo(() => {
    if (editIndex !== undefined) {
      const entityDefinition = entityDefinitions[editIndex]
      return {
        entityDefinitions,
        ...entityDefinition
      }
    }
    return { name: '', components: [], hasShape: false }
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      render={({ handleSubmit, values }) => {
        return (
          <>
            <DialogContent>
              <TextField name='name' label='Name' type='text' fullWidth />
              <FieldArray
                name='components'
                render={componentsArrayHelper => {
                  return (
                    <fieldset>
                      <legend>Components</legend>
                      {values.components.map((_, i) => {
                        return (
                          <ArrayFieldWrapper key={i}>
                            <Select
                              id={`components[${i}].component`}
                              label='Component'
                              name={`components[${i}].component`}
                              options={components.map((c, i) => ({
                                label: c.name,
                                value: i
                              }))}
                            />
                          </ArrayFieldWrapper>
                        )
                      })}
                      <Button
                        onClick={() =>
                          componentsArrayHelper.push({
                            component: null,
                            fieldValues: {}
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
          </>
        )
      }}
    />
  )
}

EntityDefinitionsForm.propTypes = {
  components: PropTypes.array.isRequired,
  entityDefinitions: PropTypes.array.isRequired,
  addEntityDefinition: PropTypes.func.isRequired,
  editIndex: PropTypes.number,
  setCreateDialogOpen: PropTypes.func.isRequired,
  updateEntityDefinition: PropTypes.func.isRequired
}
