import { connect } from 'react-redux'

import { componentsSlice } from 'common/store/components'
import { entityDefinitionsSlice } from 'common/store/entityDefinitions'
import { EntityDefinitionsForm as EntityDefinitionsFormComp } from './EntityDefinitionsForm'

const mapStateToProps = state => ({
  components: componentsSlice.selectors.getComponents(state),
  entityDefinitions: entityDefinitionsSlice.selectors.getEntityDefinitions(
    state
  )
})

export const EntityDefinitions = connect(mapStateToProps, {
  addEntityDefinition: entityDefinitionsSlice.actions.addEntityDefinition,
  updateEntityDefinition: entityDefinitionsSlice.actions.updateEntityDefinition
})(EntityDefinitionsFormComp)
