import useDocumentTitle from 'services/DocumentTitle'
import React from 'react'

export default function Dashboard(props) {
  useDocumentTitle(props.title)
  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
    </div>
  )
}
