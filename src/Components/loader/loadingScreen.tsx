import React from 'react'
import { ProgressBar } from  'react-loader-spinner'

function LoadingScreen() {
  return (
    <div
    className="flex justify-center items-center my-60 W-FULL"
    >

<span className="back">
  <span>C</span>
  <span>I</span>
  <span>T</span>
  <span>T</span>
  <span>Y</span>
  <span></span>
  <span>S</span>
  <span>H</span>
  <span>O</span>
  <span>P</span>
  <span>P</span>
  <span>E</span>
  <span>R</span>
</span>

    {/* <ProgressBar
    height="80"
    width="200"
    ariaLabel="progress-bar-loading"
    wrapperStyle={{}}
    wrapperClass="progress-bar-wrapper"
    borderColor = '#F4442E'
    barColor = '#51E5FF'
    /> */}
      
    </div>
  )
}

export default LoadingScreen
