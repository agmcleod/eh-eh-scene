import { connect } from 'react-redux'

import { entityDefinitionsSlice } from 'common/store/entityDefinitions'
import { EntityDefinitions as EntityDefinitonsComp } from './EntityDefinitions'

const mapStateToProps = state => ({
  entityDefinitions: entityDefinitionsSlice.selectors.getEntityDefinitions(
    state
  )
})

export const EntityDefinitions = connect(mapStateToProps)(EntityDefinitonsComp)
