import React from 'react'
import PieChart from 'components/charts/PieChart'

export default function LogCharts({batches}) {
  const statusCount = batches.reduce((freq, batch) => {
    const n = batch.events.length - 1
    freq[batch.events[n].event] = (freq[batch.events[n].event] || 0) + 1;
    return freq;
  }, {});
  
  return (
    <div className='log-charts'>
      {batches.length > 0 ? <PieChart data={statusCount} /> : <p>There are no batches to display.</p>}
      
    </div>
  )
}
