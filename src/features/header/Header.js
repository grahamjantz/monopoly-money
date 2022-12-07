import React from 'react'
import './Header.css'

import monopolyLogo from '../../images/monopolyLogo.png'

const header = () => {
  return (
    <div className='header'>
      <img src={monopolyLogo} className='monopoly-logo' alt='monopoly logo'/>
    </div>
  )
}

export default header