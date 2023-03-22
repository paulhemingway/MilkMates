import useDocumentTitle from 'contexts/DocumentTitle'
import React from 'react'

export default function Messages(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Messages
    </div>
  )
}
