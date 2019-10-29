import { connect } from 'react-redux'

import { componentsSlice } from 'common/store/components'
import { Components as ComponentsComp } from './Components'

const mapStateToProps = state => ({
  components: componentsSlice.selectors.getComponents(state)
})

export const Components = connect(
  mapStateToProps,
  { setComponent: componentsSlice.actions.setComponent }
)(ComponentsComp)
