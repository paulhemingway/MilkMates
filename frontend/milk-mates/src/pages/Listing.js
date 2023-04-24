import React from 'react'
import { useParams } from 'react-router-dom'
import { useListingService } from 'services/ListingService'
import BatchInfo from 'components/batch/BatchInfo'

export default function Listing() {
  const { listingId } = useParams()
  return (
    <div className='listing'>
      {listingId}
    </div>
  )
}
