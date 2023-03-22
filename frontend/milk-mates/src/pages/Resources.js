import useDocumentTitle from 'contexts/DocumentTitle'
import React from 'react'

export default function Resources(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Resources
    </div>
  )
}
