import React from 'react'

export default function Wrapper(props) {
  return (
    <div className='wrapper'>
      <h2>{props.header}</h2>
      {/* if there's data being passed, render the component with data */}
      {props.children}
    </div>
  )
}
