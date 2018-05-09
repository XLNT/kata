import React from 'react'

import './ClaimPage.css'

class ClaimPage extends React.Component {
  render () {
    return (
      this.props.match.params.code
    )
  }
}

export default ClaimPage
