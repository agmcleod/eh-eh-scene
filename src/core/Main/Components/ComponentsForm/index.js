import { connect } from 'react-redux'

import { componentsSlice } from 'common/store/components'
import { ComponentsForm as ComponentsFormComp } from './ComponentsForm'

const mapStateToProps = state => ({
  components: componentsSlice.selectors.getComponents(state)
})

export const ComponentsForm = connect(mapStateToProps, {
  addComponent: componentsSlice.actions.addComponent,
  updateComponent: componentsSlice.actions.updateComponent
})(ComponentsFormComp)
