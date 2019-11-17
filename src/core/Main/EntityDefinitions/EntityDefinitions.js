import React from 'react'
import PropTypes from 'prop-types'

import { H3 } from 'common/components/Header'
import { ListItem } from 'common/components/ListItem'
import { TopActionButton } from 'common/components/TopActionButton'

export const EntityDefinitions = ({ entityDefinitions }) => {
  return (
    <>
      <TopActionButton onClick={() => {}}>
        Create New Entity Defintion
      </TopActionButton>
      <div>
        {entityDefinitions.map((ed, i) => {
          return (
            <ListItem key={i}>
              <H3>{ed.name}</H3>
            </ListItem>
          )
        })}
      </div>
    </>
  )
}

EntityDefinitions.propTypes = {
  entityDefinitions: PropTypes.array.isRequired
}
