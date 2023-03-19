import React from 'react'
import { Puff } from 'react-loader-spinner'

function Loader() {
  return (
    <div className="flex justify-center items-center my-10">
        <Puff
  height="80"
  width="80"
  radius={1}
  color="#F85606"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
      
    </div>
  )
}

export default Loader
