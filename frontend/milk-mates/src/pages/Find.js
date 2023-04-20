import useDocumentTitle from 'services/DocumentTitle'
import React from 'react'
import Wrapper from 'components/global/Wrapper'

export default function Find(props) {
  useDocumentTitle(props.title)
  return (
    <div className='find'>
      <h1>Find Milk</h1>
      <Wrapper header="Listings"></Wrapper>
    </div>
  )
}
