import React from 'react'

export default function Wrapper({ component: Component, data, header }) {
  return (
    <div className='wrapper'>
      <h2>{header}</h2>
      {/* if there's data being passed, render the component with data */}
      {data && <Component data={data} />}
      {!data && <Component />}
    </div>
  )
}
