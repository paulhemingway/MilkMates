import useDocumentTitle from 'services/DocumentTitle'
import React from 'react'

export default function Find(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Find Milk
    </div>
  )
}
