import React, { useEffect } from 'react'
import './ActionCenter.scss'

const ActionCenter = props => {
  useEffect(() => {
    var actionCenterWidth = document.querySelectorAll('.action-center-container')[0].offsetWidth;
    // if (actionCenterWidth <= 1150) {
    //   document.querySelectorAll('.action-center')[0].classList.add('contracted')
    // }
    return
  }, [])

  return (
    <div className="action-center-container">
      <div className="action-center">
        {props.children}
      </div>
    </div>
  )
}

export default ActionCenter;