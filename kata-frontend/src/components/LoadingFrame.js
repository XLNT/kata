import React, { Component } from 'react'
import Anime from 'animejs'
import './LoadingFrame.css'

const loadingDuration = 1000
const loadingCompleteDuration = 150

/**
 * shamelessly inspired by AirSwap
 */
export default class Loader extends Component {
  componentWillMount () {
  }

  componentDidMount () {
    this.animate()
  }

  render () {
    return (
      <div id='loader-container' className='loading-frame-container'>
        <svg width='100%' height='100%' className='loading-frame-svg'>
          <rect
            id='loader-svg-rect'
            width='100%'
            height='100%'
            className='loading-frame-loading-bar'
          />
        </svg>
        <div id='loading-content-container'>

        </div>
        <div className='loading-content'>
          <div className='loading-inner big-boy'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

  animate = () => {
    setImmediate(() => {
      this.loadingBar = Anime.timeline().add({
        targets: '#loader-svg-rect',
        stroke: '#000',
      }).add({
        targets: '#loader-svg-rect',
        strokeDashoffset: [10000, 0],
        easing: 'easeInQuad',
        elasticity: 0,
        duration: loadingDuration,
      }).add({
        targets: '#loading-content-container',
        opacity: 0,
        easing: 'linear',
        duration: loadingCompleteDuration,
      }).add({
        targets: '.loading-content, .loading-inner',
        zIndex: 5,
        easing: 'linear',
        duration: 1,
      })
    })
  }
}
