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
        return acc;
      }, {})
    );
  }

  function groupCalculateHours (data) {
    // 1. get unique resources
     
    // 2. group by resource, date, task type and number of hours

    // 3. save to state
  }

  // get props data and group by  user and date
  useEffect(()=> {
    groupCalculateHours(props.data)
    console.log(props.data)
    let grouppedData = groupAndSum(props.data, ['responsible_entity', 'NORM','date'], ['duration'])
    setData(grouppedData)

  }, [])
  return (
    <>
      <div>
        {data && data.map(item => { return <div>{item.responsible_entity},{item.date}, {item.NORM}, {item.duration} </div> })}
      </div>
    </>
  )
}
