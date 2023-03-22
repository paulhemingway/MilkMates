import useDocumentTitle from 'contexts/DocumentTitle'
import React from 'react'

export default function Privacy(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Privacy page
    </div>
  )
}
