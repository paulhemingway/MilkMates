import React from 'react'
import { useListingService } from 'services/ListingService'

export default function Listing() {
  const {userListings} = useListingService()
  return (
    <div>
      <ul>
        {userListings.map(listing => {
          return <li>{listing.title}</li>
        })}
      </ul>
    </div>
  )
}
