import React, { useEffect, useState } from 'react';

export const ReportsModalBody = (props) => {
const [data, setData] = useState();

  function groupAndSum(arr, groupKeys, sumKeys){
    return Object.values( 
      arr.reduce((acc,curr)=>{
        const group = groupKeys.map(k => curr[k]).join('-');
        acc[group] = acc[group] || Object.fromEntries(
           groupKeys.map(k => [k, curr[k]]).concat(sumKeys.map(k => [k, 0])));
        sumKeys.forEach(k => acc[group][k] += curr[k]);
        acc[group]['no_incident'] +=  '#T2 ' +  curr['duration'] +': ' + curr['no_incident'] + ', '       
        // acc[group]['comment'] = arr.filter(item=> item.responsible_entity = curr.responsible_entity && item.date == curr.date).reduce((prev, current)=>{ prev + '-' + current})
        // console.log(arr.filter(item=> item.responsible_entity = curr.responsible_entity && item.date == curr.date).reduce((prev, current)=>{ return current.no_incident}))
        // console.log(acc[group]['comment'])
        return acc;
      }, {})
    )
  }


  // get props data and group by  user and date
  useEffect(()=> {
    let grouppedData = groupAndSum(props.data, ['responsible_entity', 'task', 'NORM','date'], ['duration'])
    setData(grouppedData)

  }, [])
  return (
    <>
      <div>
        {data && data.map(item => { return <div>{item.responsible_entity},{item.date}, {item.task}, {item.NORM}, {item.no_incident}, {item.duration} </div> })}
      </div>
    </>
  )
}
