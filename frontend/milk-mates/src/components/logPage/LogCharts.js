import React from 'react'
import PieChart from 'components/charts/PieChart'

export default function LogCharts({data}) {
  const statusCount = data.reduce((freq, batch) => {
    const n = batch.events.length - 1
    freq[batch.events[n].event] = (freq[batch.events[n].event] || 0) + 1;
    return freq;
  }, {});
  
  return (
    <div>
      <PieChart data={statusCount} />
    </div>
  )
}
