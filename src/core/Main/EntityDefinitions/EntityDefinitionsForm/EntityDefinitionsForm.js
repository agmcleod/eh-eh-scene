import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Formik, FieldArray } from 'formik'
import get from 'lodash/get'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import { Checkbox } from 'common/components/Checkbox'
import { TextField } from 'common/components/TextField'
import { ComponentSelect } from './ComponentSelect'
import { validationSchema } from './validationSchema'

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
    return { name: '', components: [], hasShape: false, entityDefinitions }
  }, [editIndex, entityDefinitions])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={({ handleSubmit, setFieldValue, values }) => {
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
                        const componentValue = get(
                          values,
                          `components[${i}].component`
                        )
                        const fieldValues = get(
                          values,
                          `components[${i}].fieldValues`
                        )
                        return (
                          <div key={i}>
                            <ComponentSelect
                              components={components}
                              fieldPath={`components[${i}]`}
                              currentComponent={componentValue}
                              setFieldValue={setFieldValue}
                            />
                            {Object.values(fieldValues).map(fieldValue => {
                              return (
                                <div>
                                  <TextField
                                    name={`components[${i}].fieldValues.${fieldValue.uuid}.value`}
                                    label='Field Value'
                                    type='text'
                                    fullWidth
                                  />
                                  <Checkbox
                                    label='Allow Override?'
                                    name={`components[${i}].fieldValues.${fieldValue.uuid}.allowOverride`}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                      <Button
                        onClick={() =>
                          componentsArrayHelper.push({
                            component: '',
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

EntityDefinitionsForm.propTypes = {
  components: PropTypes.array.isRequired,
  entityDefinitions: PropTypes.array.isRequired,
  addEntityDefinition: PropTypes.func.isRequired,
  editIndex: PropTypes.number,
  setCreateDialogOpen: PropTypes.func.isRequired,
  updateEntityDefinition: PropTypes.func.isRequired
}
