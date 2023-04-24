import React from 'react'
import DoughnutChart from 'components/charts/DoughnutChart'

export default function LogCharts({batches}) {
  const statusCount = batches.reduce((freq, batch) => {
    // get event name from latest event
    const status = batch.events.reduce((prev, curr) => (new Date(curr.eventDate) > new Date(prev.eventDate) ? curr : prev)).event;
    freq[status] = (freq[status] || 0) + 1;
    return freq;
  }, {});
  
  return (
    <div className='log-charts'>
      {batches.length > 0 ? <DoughnutChart data={statusCount} /> : <p>There are no batches to display.</p>}
      
    </div>
  )
}
