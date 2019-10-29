import { connect } from 'react-redux'

import { componentsSlice } from 'common/store/components'
import { ComponentsForm as ComponentsFormComp } from './ComponentsForm'

export const ComponentsForm = connect(
  null,
  { setComponent: componentsSlice.actions.setComponent }
)(ComponentsFormComp)
