import React from 'react'
import { useListingService } from 'services/ListingService'

export default function MyListings() {
  const {userListings} = useListingService()
  return (
    <div>
      <ul>
        {userListings.map((listing, index) => {
          return <li key={index}>{listing.title}</li>
        })}
      </ul>
    </div>
  )
}
