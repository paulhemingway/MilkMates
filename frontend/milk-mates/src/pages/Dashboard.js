import useDocumentTitle from 'contexts/DocumentTitle'
import React from 'react'

export default function Dashboard(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Dashboard page
    </div>
  )
}
