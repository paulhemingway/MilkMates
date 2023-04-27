import useDocumentTitle from 'services/DocumentTitle'
import React from 'react'
import Wrapper from 'components/global/Wrapper'
import FindListings from 'components/listing/FindListings'

import "assets/styles/pages/Listing.scss"


export default function Find(props) {
  useDocumentTitle(props.title)
  return (
    <div className='find'>
      <h1>Find Milk</h1>
      <Wrapper header="Listings">
        <FindListings />
      </Wrapper>
    </div>
  )
}
