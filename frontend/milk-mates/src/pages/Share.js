import useDocumentTitle from 'contexts/DocumentTitle'
import React from 'react'

export default function Share(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Share milk
    </div>
  )
}
