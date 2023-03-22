import useDocumentTitle from 'contexts/DocumentTitle';
import React from 'react'
import { useParams } from "react-router-dom"

export default function Batch(props) {
  
  const {batchId} = useParams();
  useDocumentTitle("Batch " + batchId)
  return (
    <div>
      {batchId}'s batch info
    </div>
  )
}
