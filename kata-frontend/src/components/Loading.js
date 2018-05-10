import React from 'react'
import { Loader } from 'react-loaders'

import './Loading.css'
import 'loaders.css'

const Loading = () => (
  <div className='box-loading-container'>
    <Loader type='ball-scale-ripple-multiple' color='#000' active />
  </div>
)

export default Loading
