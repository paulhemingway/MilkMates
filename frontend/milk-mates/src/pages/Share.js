import useDocumentTitle from 'services/DocumentTitle'
import React from 'react'

export default function Share(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Share milk
    </div>
  )
}
