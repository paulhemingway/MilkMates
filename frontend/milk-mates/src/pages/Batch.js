import React from 'react'
import { useParams } from "react-router-dom"

export default function Batch() {
  const {batchId} = useParams();
  return (
    <div>
      {batchId}'s batch info
    </div>
  )
}
