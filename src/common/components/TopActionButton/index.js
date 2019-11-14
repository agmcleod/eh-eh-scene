import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import { Wrapper } from './styledComponents'

export const TopActionButton = ({ children, ...props }) => (
  <Wrapper>
    <Button variant='contained' color='primary' {...props}>
      {children}
    </Button>
  </Wrapper>
)

TopActionButton.propTypes = {
  children: PropTypes.node.isRequired
}
